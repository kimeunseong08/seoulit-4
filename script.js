// 1. 질문 및 결과 데이터
const questions = [
    {
        type: "EI",
        question: "주말에 시간이 생겼을 때 나의 행동은?",
        a: "친구들에게 연락해서 밖에서 만난다. (E)",
        b: "집에서 넷플릭스를 보며 혼자 충전한다. (I)",
        scoreA: "E", scoreB: "I"
    },
    {
        type: "SN",
        question: "사과를 보았을 때 드는 생각은?",
        a: "빨갛고 맛있겠다, 아삭하겠다. (S)",
        b: "백설공주, 사과 농장, 아이폰 로고가 떠오른다. (N)",
        scoreA: "S", scoreB: "N"
    },
    {
        type: "TF",
        question: "친구야 나 슬퍼서 빵 샀어... 라고 할 때 나의 반응은?",
        a: "무슨 빵 샀어? 왜 슬픈데? (T)",
        b: "왜 슬퍼ㅠㅠ 무슨 일 있어? 괜찮아? (F)",
        scoreA: "T", scoreB: "F"
    },
    {
        type: "JP",
        question: "여행을 갈 때 나의 스타일은?",
        a: "시간 단위로 맛집과 동선을 미리 다 짜둔다. (J)",
        b: "비행기 표랑 숙소만 정하고 일단 떠난다. (P)",
        scoreA: "J", scoreB: "P"
    }
];

const results = {
    "ESTJ": "체계적이고 현실적인 최고의 관리자 유형!",
    "ESTP": "스릴을 즐기는 에너제틱한 활동가 유형!",
    "ESFJ": "주변 사람을 잘 챙기는 따뜻한 사교가 유형!",
    "ESFP": "어디서나 분위기 메이커인 자유로운 영혼 유형!",
    "ENTJ": "목표를 향해 나아가는 열정적인 리더 유형!",
    "ENTP": "호기심 많고 아이디어가 넘치는 발명가 유형!",
    "ENFJ": "사람들을 이끄는 따뜻한 카리스마의 정의로운 지도자 유형!",
    "ENFP": "재기발랄하고 긍정 에너지가 넘치는 활동가 유형!",
    "ISTJ": "한 번 맡은 일은 끝까지 해내는 청렴결백한 공무원 유형!",
    "ISTP": "만능 재주꾼, 냉철한 이성을 가진 실용주의자 유형!",
    "ISFJ": "조용하면서도 주변 사람을 헌신적으로 지키는 수호자 유형!",
    "ISFP": "예술가적 기질이 있는 따뜻한 감성의 소유자 유형!",
    "INTJ": "전략을 짜는 데 탁월한 독립적인 전략가 유형!",
    "INTP": "비평적인 관점을 가진 아이디어 뱅크 사색가 유형!",
    "INFJ": "내면이 단단하고 통찰력 있는 예언자 유형!",
    "INFP": "이상적인 세상을 꿈꾸는 마음이 따뜻한 잔망루피 유형!"
};

// 2. 상태 변수
let currentIdx = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// 3. DOM 요소 추출
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const optionA = document.getElementById("option-a");
const optionB = document.getElementById("option-b");
const questionText = document.getElementById("question-text");
const progressBar = document.getElementById("progress");

const mbtiResult = document.getElementById("mbti-result");
const resultDesc = document.getElementById("result-desc");

// 4. 이벤트 리스너 등록
startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", restartTest);
optionA.addEventListener("click", () => selectOption("A"));
optionB.addEventListener("click", () => selectOption("B"));

// 5. 기능 함수
function startTest() {
    startScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    if (currentIdx < questions.length) {
        // 진행바 업데이트
        progressBar.style.width = `${(currentIdx / questions.length) * 100}%`;
        
        // 질문 및 선택지 텍스트 세팅
        const q = questions[currentIdx];
        questionText.textContent = q.question;
        optionA.textContent = q.a;
        optionB.textContent = q.b;
    } else {
        showResult();
    }
}

function selectOption(choice) {
    const q = questions[currentIdx];
    if (choice === "A") {
        scores[q.scoreA]++;
    } else {
        scores[q.scoreB]++;
    }
    currentIdx++;
    showQuestion();
}

function showResult() {
    questionScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // 점수 계산하여 MBTI 문자열 생성
    let mbti = "";
    mbti += scores.E >= scores.I ? "E" : "I";
    mbti += scores.S >= scores.N ? "S" : "N";
    mbti += scores.T >= scores.F ? "T" : "F";
    mbti += scores.J >= scores.P ? "J" : "P";

    // 결과 화면에 띄우기
    mbtiResult.textContent = mbti;
    resultDesc.textContent = results[mbti] || "당신은 신비로운 성향을 가지고 있군요!";
}

function restartTest() {
    currentIdx = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}
