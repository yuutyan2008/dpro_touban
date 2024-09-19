const members = [
  { id: 1, name: "宮岡メンター", entranceData: "", expirationDate: "" },
  {
    id: 2,
    name: "尾澤",
    entranceData: "2024-07-01",
    expirationDate: "2024-10-30",
  },
  {
    id: 3,
    name: "荻野",
    entranceData: "2024-09-01",
    expirationDate: "2024-12-31",
  },
  {
    id: 4,
    name: "高野",
    entranceData: "2024-09-01",
    expirationDate: "2024-12-31",
  },
];

// 今日の日付を取得し、残りの在籍日数を計算
function calcDays_left(expirationDate) {
  const today = new Date(); // 今日の日付を取得
  const expiration = new Date(expirationDate); // 有効期限の日付をDateオブジェクトに変換

  // 残りの在籍日数を計算（ミリ秒単位から日数に変換）
  const timeDifference = expiration - today; // ミリ秒単位で有効期限までの日数を計算
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // ミリ秒を日数に変換

  return daysLeft;
}

// 在籍期限が切れていないメンバーだけを取り出すためのフィルタリングを行う
// members配列の要素を一つずつ取り出し関数で処理、条件を満たす要素を返す
const activeMembers = members.filter(function(member) {
  // メンバーの有効期限（expirationDate）を使って、残りの日数を計算
  const leftDays = calcDays_left(member.expirationDate);
  
  // 残りの日数が1日以上がtrueとなるmemberを返す
  return leftDays > 0; 
});

// フィルタリング後、名前一覧とチェックボックスを表示する
function displayMembers() {
  const memberList = document.getElementById("memberList");
  memberList.innerHTML = ""; // 過去のリストをクリア

  activeMembers.forEach(function (member) {
    const listItem = document.createElement("li"); //新しい<li>を生成
    listItem.innerHTML = `
        <input type="checkbox" id="${member.id}">
        <label for="${member.id}">${member.name}</label>
      `; //新しい<li>にタグを追加
    memberList.appendChild(listItem);
  });
}

// 表示一覧からくじ引き対象外のメンバーを除外する
function excludeMembers() {
  return members.filter(function(activeMembers) {
    const checkbox = document.getElementById(`${member.id}`);//idの値member.idを取り出している
    return !checkbox.checked; // チェックが入っていないメンバー(idで判別)だけを残す
  });
}

// 当番を選ぶ関数を定義
function selectRandomMember(activeMembers) {
  const randomResult = Math.floor(Math.random() * activeMembers.length); // 0〜メンバー数-1のランダムなインデックスを取得
  return members[randomResult]; // ランダムに選ばれたメンバーを返す
}

// 対象外メンバーを除外後、startをクリックすると当番が選ばれる
const startlottery = document.getElementById("startButton");
startlottery.addEventListener("click", function () {
  // チェックボックスで除外されていないメンバーだけを対象とする
  activeMembers = excludeMembers(); // ← ここでactiveMembersを更新

  if (activeMembers.length > 1) {
    const selectedMember = selectRandomMember(activeMembers); // ランダムにメンバーを選ぶ
    document.getElementById(
      "selectedMember"
    ).textContent = `明日の担当は、${selectedMember.name} さんです！`; // メンバーを表示
  } else {
    document.getElementById("selectedMember").textContent =
      "有効なメンバーがいません"; // メンバーがいない場合
  }
});

// 結果を表示
displayMembers();
