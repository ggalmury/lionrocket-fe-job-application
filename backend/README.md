## 랴이언로켓 FE 사전과제 — Backend

AI 채팅 서비스의 백엔드 서버입니다. NestJS 기반으로 인증 및 인가, AI 캐릭터 관리, AI 채팅 기능이 구현되어 있습니다.

### 기술 스택

- Node v22.18.0
- npm v.11.5.2
- NestJS v11.0.0, TypeScript
- TypeORM v0.3
- SQLite3 v.5.1.7
- Keyv v.5.5.0

---

## 실행 방법

1. 의존성 설치

```bash
cd backend
npm install
```

2. 환경 변수 설정

```bash
cp .env.example .env.development

# ANTHROPIC_API_KEY 필드에 실제 API Key를 등록해주세요.
```

3. 개발 서버 실행

```bash
npm run start:dev
```

---

## 환경 변수 (.env)

필수/주요 항목은 다음과 같습니다.

- DB_DATABASE: SQLite 파일 경로(기본 `./database.sqlite`)
- DB_SYNCHRONIZE: 스키마 동기화 사용(개발 `true`, 배포 `false`)
- KEYV_NAMESPACE: Keyv 네임스페이스(기본 `lionrocket`)
- BCRYPT_SALT_ROUNDS: 비밀번호 해시 라운드(기본 `10`)
- JWT_ISSUER: JWT 발급자 식별자
- ACCESS_TOKEN_KEY: 액세스 토큰 서명 비밀키
- ACCESS_TOKEN_EXP: 액세스 토큰 만료(예: `30m`)
- ANTHROPIC_API_KEY: Claude API 키(필수)
- CLAUDE_MODEL: Claude 모델명(기본 `claude-3-haiku-20240307`)
- CLAUDE_MAX_TOKENS: Claude 응답 토큰 상한(예: `1000`)

---

## 엔드포인트 개요

모든 엔드포인트는 기본 프리픽스 `/api`를 사용합니다.

### 헬스체크

- GET `/api/ping` → `"pong"` 문자열 반환

### 인증 및 인가(Auth)

JWT access token을 이용한 인증 방식을 사용하며, refresh token은 시간 관계상 생략하였습니다.

- POST `/api/auth/sign-up`
  - Body: `{ accountId: string, password: string }`
  - Res: `{ id: number, accountId: string, accessToken: string }`

- POST `/api/auth/sign-in`
  - Body: `{ accountId: string, password: string }`
  - Res: `{ accessToken: string }`

- 인증 방식: `Authorization: Bearer <accessToken>`
- 로그아웃: 서버 상태 저장 없음 → 클라이언트에서 토큰 제거

### AI 캐릭터 AiCharacter

- GET `/api/ai-character` (인증 필요)
  - Res: `{ defaultCharacters: { id: number, name: string, prompt: string, thumbnailUrl: string, type: AiType}[], customCharacters: { id: number, name: string, prompt: string, thumbnailUrl: string, type: AiType}[] }`
  - AiCharacterDto: `{ id, name, prompt, thumbnailUrl, type }`
  - 비고: 서버 기동 시 기본 캐릭터(3개) 자동 시드

- POST `/api/ai-character` (인증 필요, multipart/form-data)
  - Fields: `name`(문자열, 최대 10자), `prompt`(문자열)
  - File: `thumbnail` (최대 5MB)
  - Res: `{ id: number, name: string, thumbnailUrl: string }`
  - 업로드 썸네일 경로: `./uploads/ai-characters/`
  - 기본 썸네일 정적 경로: `./public/ai-characters/...`

### AI 채팅 AiChat

- 제약조건: 채팅 1회 요청(사용자 입력 메세지)인 `content`는 최대 200자

- GET `/api/ai-chat?aiCharacterId=number` (인증 필요)
  - Res: `{ aiCharacterId: number, chats: { role, content, createdAt }[] }`
  - 캐시: Keyv에 10분 TTL로 보관, 캐시 미스 시 DB 조회 후 캐싱

- POST `/api/ai-chat` (인증 필요)
  - Body: `{ aiCharacterId: number, content: string }`
  - Res: `{ aiCharacterId: number, chat: { role: 'assistant', content, createdAt } }`
  - 동작: 대화는 DB에 영속화되며, Anthropic Claude API 호출로 어시스턴트 응답을 생성합니다.

---

## 데이터 모델 요약

- Member(`members`): `id, accountId(unique), encryptedPassword, createdAt...`
- AiCharacter(`ai_characters`): `id, name, prompt, thumbnailUrl, type(default|custom), member?`
- AiChat(`ai_chats`): `id, role(user|assistant), content, member, character, createdAt...`

서버 부팅 시 기본 AI 캐릭터 3종이 존재하지 않으면 자동 생성됩니다.

---

## 개발 메모/주의 사항

- CORS 설정은 필요 시 추가로 구성
- Keyv는 인메모리 스토리지로, 서버 재부팅 시 기존 캐싱된 데이터는 사라집니다.

---

## 스크립트

- 개발서버 실행: `npm run start:dev`

## AI 활용 부분

- Claude API 호출 메소드(domains/ai-chat/services/ai-chat.service.ts -> send method)에서 API를 fetch하는 부분을 ChatGPT에게 질문하여 초안 작성, 이후 요구사항에 맞춰 구체화
- Claude에게 Anthropic Claude API 사용 방법 요청
- 단순 반복 작업들(변수 및 클래스 자동완성 등)을 Vscode Copilot extension을 통해 해결
- SQLite 데이터베이스에 맞는 typeorm config 파일(config/typeorm.config.ts) ChatGPT에게 작성 요청
- Vscode Codex extension을 통해 구현 완료된 프로젝트 구조 파악 요청 후 Readme.md 초안 작성 요청
