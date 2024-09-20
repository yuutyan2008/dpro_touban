const members = [
  { id: 1, name: "宮岡メンター", entranceData: "", expirationDate: "" },
  {
    id: 2,
    name: "尾澤",
    entranceData: "2024-07-01",
    expirationDate: "2024-10-21",
  },
  {
    id: 3,
    name: "荻野",
    entranceData: "2024-09-01",
    expirationDate: "2024-12-20",
  },
  {
    id: 4,
    name: "高野",
    entranceData: "2024-09-01",
    expirationDate: "2024-12-20",
  },
];

// 
// くじを引くメンバーを決める
// 


// 今日の日付を取得し、残りの在籍日数を計算する関数を定義
function calcDays_left(expirationDate) {
  const today = new Date(); // 今日の日付を取得
  const expiration = new Date(expirationDate); // 有効期限の日付をDateオブジェクトに変換

  // 残りの在籍日数を計算（ミリ秒単位から日数に変換）
  const timeDifference = expiration - today; // ミリ秒単位で有効期限までの日数を計算
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // ミリ秒を日数に変換

  return daysLeft;
}

// 在籍期限が切れていないメンバーだけを取り出すためのフィルタリングを実行
// members配列の要素を一つずつ取り出し関数で処理、条件を満たす要素を返す
let activeMembers = members.filter(function(member) {
  // メンバーの有効期限（expirationDate）を使って、残りの日数を計算
  const leftDays = calcDays_left(member.expirationDate);
  
  // 残りの日数が1日以上がtrueとなるmemberを返す
  return leftDays > 0; 
});



// 名前一覧とチェックボックス、残り日数を作成する関数
function createCheckboxName_List(member) {
  const daysLeft = calcDays_left(member.expirationDate); // 残り日数を計算する関数を呼び出し
  const listItem = document.createElement("li"); // 新しい<li>要素を生成
  listItem.innerHTML = `
    <label for="${member.id}">${member.name}</label>
    <input type="checkbox" id="${member.id}">
    <span> 残り在籍日数: ${daysLeft} 日</span>
    
  `; // メンバー名とチェックボックスを挿入
  return listItem;
}

// フィルタリング後、名前一覧とチェックボックスを表示する関数
function displayMembers(members) {
  const memberList = document.getElementById("memberList");
  memberList.innerHTML = ""; // 過去のリストをクリア

  activeMembers.forEach(function (member) {
    const listItem = createCheckboxName_List(member); // リストアイテムを生成
    //新しい<li>にタグを追加
    memberList.appendChild(listItem);
  });
}

displayMembers()

//
// くじの実行
//



const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// 対象外メンバーを除外するイベントを登録
startButton.addEventListener("click", excludeMembers);
// 当番を選ぶイベントを登録
startButton.addEventListener("click", selectRandomMember);
startButton.addEventListener("click", runLottery);
// debugger
// リセット登録
resetButton.addEventListener("click", reset);



// 表示一覧からチェックの入ったメンバーを除外する関数を定義
function excludeMembers() {
  activeMembers = activeMembers.filter(function(member) {
    const checkbox = document.getElementById(`${member.id}`);//id = member.idを取り出している
    return !checkbox.checked; // チェックが入っていないメンバー(idで判別)だけを残す
  });
}

// 当番を選ぶ関数を定義
function selectRandomMember() {

  const randomResult = Math.floor(Math.random() * activeMembers.length); // ランダムインデックスを取得
  return activeMembers[randomResult]; // ランダムに選ばれたメンバーを返す
}

// くじ引き処理
function runLottery() {
  // debugger
  // チェックボックスで除外されていないメンバーのみを対象とする
  excludeMembers(); // ← activeMembers を更新する
  if (activeMembers && activeMembers.length > 0) {
    const selectedMember = selectRandomMember(); // ランダムにメンバーを選ぶ
    document.getElementById(
      "selectedMember"
    ).textContent = `明日の担当は、${selectedMember.name} さんです！`; // メンバーを表示
  } else {
    document.getElementById("selectedMember").textContent =
      "有効なメンバーがいません"; // メンバーがいない場合
  }
}


  // リセット
  function reset() {

    const checkbox = document.getElementById(`${member.id}`);//id = member.idを取り出している

    activeMembers.forEach(function (member) {
      const checkbox = document.getElementById(`${member.id}`); // メンバーのチェックボックスを取得
      if (checkbox) {
        checkbox.checked = false; // チェックを解除
      }
    });
    // 当番結果をクリア
    document.getElementById("selectedMember").textContent = "";

  }

// フィルタリング後、名前一覧とチェックボックスを表示する関数を実行
// window.onload = displayMembers;
