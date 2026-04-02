<p style="text-align: center;">
  <img 
    src="https://github.com/user-attachments/assets/7f8da2b7-5a0f-4df7-821f-37ff847ea2ac" 
    alt="Self Interior Guide 메인 화면"
    width="900"
  />
</p>

# 🏠 Self Interior Guide

셀프 인테리어를 처음 시작하는 사용자를 위한  
**체크리스트 기반 가이드 + 3D 견적 웹 서비스**

👉 복잡한 인테리어 과정을 “순서”가 아니라  
👉 **참고형 체크리스트 UX**로 단순화한 프로젝트입니다.

---

## 🔗 Live Demo
👉 https://self-interior-guide.vercel.app

---

## 📌 프로젝트 소개

Self Interior Guide는  
셀프 인테리어 초보자가 겪는 대표적인 문제:

- 무엇부터 시작해야 할지 모름
- 순서를 몰라 시행착오 발생
- 정보가 너무 많고 복잡함

을 해결하기 위해 만든 서비스입니다.

---
## 🛠 기술 스택

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Zustand
- Tailwind CSS v4

### 3D / Visualization
- Three.js
- React Three Fiber
- @react-three/drei

### Tooling
- ESLint

## 🗂 프로젝트 구조
```
src/
├── app/
│   ├── router.tsx
│   └── RootLayout.tsx
│
├── pages/
│   ├── HomePage.tsx
│   ├── GuideStartPage.tsx
│   ├── GuideStepPage.tsx
│   ├── GuideResultPage.tsx
│   └── EstimatePage.tsx
│
├── features/
│   ├── guide/
│   │   ├── data/
│   │   │   └── guideData.ts
│   │   ├── store/
│   │   │   └── useGuideStore.ts
│   │   └── types/
│   │       └── guide.ts
│   │
│   └── estimate/
│       ├── data/
│       ├── types/
│       └── components/
│
├── shared/
│   └── ui/
│       ├── PageShell.tsx
│       ├── SectionCard.tsx
│       └── ScrollToTop.tsx
│
└── main.tsx
```
## 🖼 Screenshots
### 🏠 HomePage
![HomePage](https://github.com/user-attachments/assets/7f8da2b7-5a0f-4df7-821f-37ff847ea2ac)

### 🟢 Guide Start
![Guide Start](https://github.com/user-attachments/assets/2a55a061-a9d3-45ce-9df4-07fe9cc91f07)

### 🔵 Guide Step
![Guide Step](https://github.com/user-attachments/assets/fdbf4724-6715-4c51-a73a-15fcbdbe732b)
![Guide Step Detail](https://github.com/user-attachments/assets/98a9acba-b7b5-4efb-ab23-a6bd94d1b6de)

### 🟣 Guide Result
![Guide Result](https://github.com/user-attachments/assets/93c04d37-0f74-4288-981f-0a98c87831d5)

### 🟠 Estimate
![Estimate](https://github.com/user-attachments/assets/225ab71d-e667-4689-b42d-ed1e00dd886e)

## 🖥 사용 방법
1. 홈에서 가이드 시작
2. 공간 / 범위 / 상황 선택
3. 필요한 체크리스트만 확인
4. 전체 보기에서 진행 상태 정리
5. 견적 페이지로 이동
6. 공간과 색상을 선택하면서 3D로 확인 + 견적 비교


##   🖥 실행 방법
```
npm install
npm run dev
npm run build
```
## 💡 만든 이유 / 목표

셀프 인테리어를 처음 시작하는 사용자들은  
“무엇부터 해야 하는지 모르는 상태”에서  
검색과 시행착오를 반복하는 경우가 많습니다.

이 프로젝트는 이러한 문제를 해결하기 위해:

- 복잡한 과정을 단계형이 아닌 **체크리스트형 UX로 단순화**
- 필요한 정보만 선택적으로 볼 수 있도록 설계
- 가이드 → 견적으로 자연스럽게 이어지는 흐름 제공

을 목표로 개발되었습니다.

👉 단순한 정보 제공이 아니라  
👉 **사용자의 부담을 줄이는 UX 설계**에 집중했습니다.

---

## 👨‍💻 만든 사람

**류인태**

- GitHub: https://github.com/Ryuintae