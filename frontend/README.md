## 랴이언로켓 FE 사전과제 — Frontend

AI 채팅 서비스의 프론트엔드입니다. React + Vite 기반으로 인증, AI 캐릭터 관리, AI 채팅 기능이 구현되어 있습니다.

### 기술 스택

- Node v22.18.0
- npm v11.5.2
- React v19, TypeScript, Vite v7
- React Router v7
- TanStack Query v5
- Tailwind CSS v4

---

## 실행 방법

1. 의존성 설치

```bash
cd frontend
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

---

## 환경 설정

API 서버 URL은 아래 상수에서 관리합니다.

- `frontend/src/lib/constants/url.ts`
  - `SERVER_URL` (기본 `http://localhost:3000/`)
  - `API_SERVER_URL = SERVER_URL + "api/"`

배포/다른 서버로 연결 시 해당 상수를 변경하세요.

---

## 라우팅

- `/sign-in`: 로그인 페이지
- `/sign-up`: 회원가입 페이지
- `/`(보호 라우트): 홈(캐릭터 목록 + 채팅)
  - 보호 처리: `RequireAuthPage`가 로그인 상태(`useIsLogin`) 확인 → 미로그인 시 `/sign-in`으로 리다이렉트

---

## 주요 화면/기능

### 인증 및 인가(Auth)

- 공통 폼 컴포넌트: `AuthForm` (atoms/molecules 조합)
- 로그인/회원가입 처리: `useSignIn`, `useSignUp`
- 로그인 여부: `useIsLogin` (보호 라우트에 사용)

### AI 캐릭터 AiCharacter

- 목록 조회: `useAiCharacters` (기본/커스텀 통합, 기본이 상단)
- 생성: `useCreateAiCharacter` (썸네일 업로드 포함)
- 리스트 UI: `CharacterList`, `CharacterListItem`
  - 썸네일 하단 라벨: 기본("기본")/커스텀("커스텀") 표시
- 생성 모달: `CreateAiCharacterModal`
- 소개 모달: `AiCharacterIntroModal` (캐릭터 선택 시 노출)

### AI 채팅 AiChat

- 캐릭터별 대화 조회/캐시: `useAiChats(aiCharacterId)`
- 메시지 보내기: `useSendChat`
  - 낙관적 업데이트: 보낸 내 메시지를 즉시 추가(`role=user`, `createdAt=now`)
  - 서버 응답 도착 시 어시스턴트 메시지가 이어서 추가
- UI: `ChatPanel`
  - 세로 높이 고정, 내부 스크롤(하단 정렬)
  - 새 메시지 도착 시 자동으로 최하단 스크롤
  - 사용자 메시지 우측, AI 메시지 좌측 정렬
  - 모든 메시지 타임스탬프(YYYY-MM-DD HH:mm) 표시
  - AI 응답 중 "상대가 입력 중…" 로딩 버블 노출

---

## 컴포넌트 구조

아토믹 디자인(Atoms/Molecules/Organisms/Layouts)을 적용했습니다.

- `components/atoms`: 버튼, 타이포그래피, 입력 등 최소 단위
- `components/molecules`: `FormField`, `CharacterListItem` 등 조합 단위
- `components/organisms`: `AuthForm`, `CharacterList`, `CreateAiCharacterModal`, `ChatPanel` 등 화면 구성 단위
- `components/layouts`: `Header`, `Main`, `Page`, `RequireAuthPage`

---

## 개발 메모/주의 사항

- 스크롤 처리: 메인/패널에 `min-h-0`을 적용해 부모 영역을 넘지 않고 내부 스크롤이 동작하도록 구성
- 입력 UX: 전송 시 입력값 즉시 클리어, Shift+Enter 줄바꿈 등은 필요 시 추가 가능. 엔터시 메세지 보내기 기능은 미구현
- 타입/모델: 백엔드 스키마를 기준으로 Zod 모델을 사용(zod는 백엔드에서 주로 사용, FE는 훅의 타입을 신뢰)

---

## 스크립트

- 개발서버 실행: `npm run dev`

---

## AI/도구 활용

- Vscode Codex extension을 통해 요구사항에 기반한 컴포넌트 초안 작성
- 단순 반복 작업들(변수 및 클래스 자동완성 등)을 Vscode Copilot extension을 통해 해결
- Vscode Codex extension을 통해 구현 완료된 프로젝트 구조 파악 요청 후 Readme.md 초안 작성 요청
