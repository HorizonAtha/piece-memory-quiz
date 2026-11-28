//setup variabel
let soal;

const elementSubjek = document.getElementById("element_Subjek");
const elementPetunjuk = document.getElementById("element_Petunjuk");
const elementContainer = document.getElementById("element_ContainerStruktur");

let soalIndex = 0
let currentSoal;
let strukturSoal;

let isPilgan = false

let redactInfoIndex;

let elementRedactedInput;
let elementRedactedValue;

let prevsoal = 0;

const element_buttons = document.querySelectorAll(".buttons")

//setup disabler
document.getElementById("buttonStop").disabled = true
document.getElementById("buttonNext").disabled = true

//library slidion
let isLibHide = true;
const elementLib = document.getElementById("soalLib");
function slide() {
      if (isLibHide == true) {elementLib.style.right = "15px"} 
            else {elementLib.style.right = "-420px"};

      isLibHide = !isLibHide;
}

function StartDisable() {
      elementRedactedInput.disabled = false;
      document.getElementById("buttonNext").disabled = false;
      document.getElementById("buttonStart").disabled = true;
      document.getElementById("buttonDark").disabled = true;
      document.getElementById("buttonStop").disabled = false;
      document.getElementById("soalLib").disabled = true;
}

function pilgan_StartDisable() {
      document.getElementById("buttonNext").disabled = false;
      document.getElementById("buttonStart").disabled = true;
      document.getElementById("buttonDark").disabled = true;
      document.getElementById("buttonStop").disabled = false;
      document.getElementById("soalLib").disabled = true;
}

//audios
var soundCorrect = document.getElementById("correctsnd")
var soundWrong = document.getElementById("wrongsnd")

function playCorrect() {soundCorrect.play()}
function playWrong() {soundWrong.play()}

var soundNext = document.getElementById("nextsnd");
function playNext() {soundNext.play()}

var soundSetting = document.getElementById("settingsnd");
function playSetting() {soundSetting.play()}

//SOAL LIBRARY
//    di file sebelah ngab

const elementGambar = document.getElementById("element_gambar");
//elementGambar.style.opacity = "0";

//easy setting, ganti ke paket soal disini
soal = soal_hukumbacaan;

//    ISIAN
//when submit
function getSoal() {
      document.getElementById("buttonNext").disabled = false;
      playNext();
      elementContainer.textContent = "";
      soalIndex = Math.floor(Math.random() * soal.length);
      if (soalIndex == prevsoal) {
            soalIndex = Math.floor(Math.random() * soal.length);
      }
      //console.log(soalIndex);
      currentSoal = soal[soalIndex];
      if (currentSoal.gambar == null) {
            elementGambar.src = "assets/asset_null.png";
            elementGambar.style.display = "none"
      } else {
            elementGambar.src = currentSoal.gambar;
            elementGambar.style.marginLeft = "25vw"
      };
      strukturSoal = currentSoal.struktur;

      prevsoal = soalIndex;

      getRedactInfo()
}

function getRedactInfo() {
      redactInfoIndex = Math.floor(Math.random()*strukturSoal.length);
      redactedContentKey = strukturSoal[redactInfoIndex];

      applySoal();
}

function applySoal() {
      elementSubjek.textContent = currentSoal.subjek;
      elementPetunjuk.textContent = currentSoal.petunjuk;

      console.log("Soal :" + currentSoal.subjek);
      console.log(currentSoal.petunjuk)

      strukturSoal.forEach((item, index) => {
            const input = document.createElement("input");
            input.type = "text";
            
            if (index === redactInfoIndex) {
                  input.placeholder = "isi..."
                  if (isDark == true) {input.style.color = "white"} 
                  else {input.style.color = "black"}
                  elementRedactedInput = input;
                  elementRedactedValue = item;
            } else {
                  input.value = item;
                  input.disabled = true;
                  if (isDark == true) {input.style.color = "#00ff26"} 
                        else {input.style.color = "green"}
                  input.style.width = "fit-content"
                  input.style.textAlign = "center"
            };
            elementContainer.appendChild(input);
      });
}

var inputEnter = document.body;
inputEnter.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("buttonNext").click();
      }
});

function evaluasi() {
      document.getElementById("buttonNext").disabled = true;
      elementRedactedInput.disabled = true;

      if (elementRedactedInput.value.toLowerCase() == elementRedactedValue.toLowerCase()) {
            if (isDark == true) {
                        elementRedactedInput.style.borderColor = "#00ff26";
                        elementRedactedInput.style.color = "#00ff26";
                  } else {
                        elementRedactedInput.style.borderColor = "green";
                        elementRedactedInput.style.color = "green";
                  };
            playCorrect();
            console.log("jawaban mu : " + elementRedactedInput.value + " - benar")
      } else { 
            elementRedactedInput.style.borderColor = "red";
            elementRedactedInput.style.color = "red";
            console.log("jawaban mu : " + '"' + elementRedactedInput.value + '"' + " - salah")
            console.log("kunci jawaban : " + elementRedactedValue)
            elementRedactedInput.value = elementRedactedInput.value+ " (" + elementRedactedValue + ")";
            playWrong();
            
      };
      console.log("============================================")

      setTimeout(getSoal, 650);
};

//    PILGAN
function getPilgan() {
      document.getElementById("buttonNext").disabled = false;
      playNext();
      elementContainer.textContent = "";
      soalIndex = Math.floor(Math.random() * soal.length);
      if (soalIndex == prevsoal) {
            soalIndex = Math.floor(Math.random() * soal.length);
      }
      //console.log(soalIndex);
      currentSoal = soal[soalIndex]; //ambil pecahan soal
      if (currentSoal.gambar == null) {
            elementGambar.src = "assets/asset_null.png";
            elementGambar.style.display = "none"
      } else {
            elementGambar.src = currentSoal.gambar;
            elementGambar.style.marginLeft = "25vw"
      };
      strukturSoal = currentSoal.pilgan;
      //console.log(currentSoal)
      console.log(strukturSoal)

      prevsoal = soalIndex;
      applyPilgan();
}

function applyPilgan() {
      elementSubjek.textContent = currentSoal.subjek;
      elementPetunjuk.textContent = currentSoal.petunjuk;

      console.log("Soal :" + currentSoal.subjek);
      console.log(currentSoal.petunjuk)

      for (let i = 0; i < strukturSoal.length; i++) {
            const button = document.createElement("button");
            button.textContent = strukturSoal[i];
            button.style.width = "fit-content"
            button.style.textAlign = "center"
            elementContainer.appendChild(button);
            button.className = "pilgan_opsi";
            if (isDark == true) {button.style.color = "white"} 
                  else {button.style.color = "black"}
            if (i == currentSoal.kunci) {
                  button.onclick = () => {
                        console.log("benar")
                        evaluasi_benar();
                  };
                  button.id = 'correct'
            } else {
                  button.onclick = () => {
                        let wrongs = document.querySelectorAll('#wrong')
                        wrongs.forEach(element => {
                              element.style.color = "gray"
                              element.disabled = true
                        })
                        button.style.color = "red"
                        document.getElementById("correct").style.color = "green"
                        playWrong()
                        setTimeout(getPilgan, 650);
                  };
                  button.id = "wrong"

            }
      }
}

function evaluasi_benar() {
      let wrongs = document.querySelectorAll('#wrong')
      wrongs.forEach(element => {
            element.style.color = "gray"
            element.disabled = true
      })
      
      document.getElementById("correct").disabled = true;
      document.getElementById("correct").style.color = "green";
      playCorrect();
      setTimeout(getPilgan, 650);
}


//dark mode toggle
let isDark = false;

function dark() {
      if (isDark == false) {
            document.body.style.backgroundColor = "#121212";
            document.getElementById("title").style.color = "#f0f0f0";
            document.getElementById("credit").style.color = "#f0f0f0";
            document.getElementById("element_Subjek").style.color = "#f0f0f0"
            document.getElementById("element_Petunjuk").style.color = "#a5a5a5";
            document.getElementById("buttonDark").style.color = "#f0f0f0";
            document.getElementById("soalLib").style.filter = "invert(0.95)";
            elementGambar.style.filter = "invert(0.95)"
            element_buttons.forEach(element => {
                  element.style.filter = "invert(0.94)";
            });
      } else {
            document.body.style.backgroundColor = "#ffffff";
            document.getElementById("title").style.color = "#000000";
            document.getElementById("credit").style.color = "#000000";
            document.getElementById("element_Subjek").style.color = "#000000"
            document.getElementById("element_Petunjuk").style.color = "#000000";
            document.getElementById("buttonDark").style.color = "#000000";
            document.getElementById("soalLib").style.filter = "invert(0)";
            elementGambar.style.filter = "invert(0)";
            element_buttons.forEach(element => {
                  element.style.filter = "invert(0)";
            });
      };
      isDark = !isDark;
};

//terminator
function terminate() {
      elementRedactedInput.disabled = true;
      document.getElementById("buttonNext").disabled = true;
      document.getElementById("buttonStart").disabled = false;
      document.getElementById("buttonDark").disabled = false;
}

function pilganterminate() {
      document.getElementById("buttonNext").disabled = true;
      document.getElementById("buttonStart").disabled = false;
      document.getElementById("buttonDark").disabled = false;
}

//put to the menu

//small note : Athaya x Yumna is canon >///< XD
