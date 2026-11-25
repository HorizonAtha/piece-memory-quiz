//setup variabel
let soal;

const elementSubjek = document.getElementById("element_Subjek");
const elementPetunjuk = document.getElementById("element_Petunjuk");
const elementContainer = document.getElementById("element_ContainerStruktur");

let soalIndex = 0
let currentSoal;
let strukturSoal;

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
soal_ginjal= [
            {
                  gambar: null,
                  subjek: "Bagian bagian nefron ginjal",
                  petunjuk: "tiga nama bagian ginjal",
                  struktur: ["glomerulus","TKP","TKD"]
            },
            {
                  gambar: null,
                  subjek: "Proses-proses pada nefron ginjal",
                  petunjuk: "urut",
                  struktur: ["Filtrasi","reabsorpsi","augmentasi"]
            },
            {
                  gambar: null,
                  subjek: "Masalah pada ginjal",
                  petunjuk: "nama, letak(2), material dalam urin, hasil",
                  struktur: ["diabetes mellitus","glomerulus dan tkp","glukosa","merah bata"]
            },
            {
                  gambar: null,
                  subjek: "Masalah pada ginjal",
                  petunjuk: "nama, letak, material dalam urin, hasil uji",
                  struktur: ["albuminuria","glomerulus","protein","ungu"]
            },
            {
                  gambar: null,
                  subjek: "Masalah pada ginjal",
                  petunjuk: "nama, letak, material dalam urin, hasil coba",
                  struktur: ["hematuria","glomerulus","darah","ungu"]
            },
            {
                  gambar: null,
                  subjek: "Masalah pada ginjal",
                  petunjuk: "nama, letak, material dalam urin",
                  struktur: ["batu ginjal","pelvis","endapan"]
            },
];

soal_enzim = [
            {
                  gambar: null,
                  subjek: "enzim pada proses pencernaan",
                  petunjuk: "nama, letak, zat yang diubah, hasil",
                  struktur: ["ptialin","mulut","amilum","maltosa"]
            },
            {
                  gambar: null,
                  subjek: "enzim pada proses pencernaan",
                  petunjuk: "nama, letak, zat yang diubah, hasil",
                  struktur: ["pepsin","lambung","protein","pepton"]
            },
            {
                  gambar: null,
                  subjek: "enzim pada proses pencernaan",
                  petunjuk: "nama, letak, zat yang diubah, hasil",
                  struktur: ["renin","lambung","protein susu","kasein"]
            },
            {
                  gambar: null,
                  subjek: "enzim pada proses pencernaan",
                  petunjuk: "nama, letak, zat yang diubah, hasil",
                  struktur: ["tripsin","pankreas","protein","asam amino"]
            },
            {
                  gambar: null,
                  subjek: "enzim pada proses pencernaan",
                  petunjuk: "nama, letak, zat yang diubah, hasil",
                  struktur: ["lipase","pankreas","lemak","aam lemak dan gliserol"]
            },
            {
                  gambar: null,
                  subjek: "enzim pada proses pencernaan",
                  petunjuk: "nama, letak, fungsi utama, fungsi kedua, fungsi ketiga",
                  struktur: ["asam klorida","lambung","membunuh kuman","mengasamkan makanan","mengaktifkan pepsinogen"]
            }
];

soal_bioteknologi = [
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi",
                  struktur: ["insulin","diabetes mellitus"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi(2)",
                  struktur: ["Antibodi Monoklonal","tumor dan kanker"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi(2)",
                  struktur: ["antibiotik","bakteri dan jamur"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi",
                  struktur: ["Urokinase","bekuan darah"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi",
                  struktur: ["Eritropoetin","anemia"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi",
                  struktur: ["Gen beta globulin","thalasemia"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi",
                  struktur: ["vaksin","virus"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - membantu",
                  struktur: ["protein sel tunggal","protein"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi",
                  struktur: ["thiobactillus","pemisahan besi"]
            },
            {
                  gambar: null,
                  subjek: "Bioteknologi modern",
                  petunjuk: "nama - mengatasi",
                  struktur: ["pseudomonas","minyak di laut"]
            }
];

soal_penyakitseks = [
      {
            gambar: null,
            subjek: "Penyakit pada organ reproduksi wanita",
            petunjuk: "nama - penyebab - jenis - gejala(2)",
            struktur: ["gonorrhoe","neisseria gonorrhoeae","bakteri","kencing panas, nanah"]
      },
      {
            gambar: null,
            subjek: "Penyakit pada organ reproduksi wanita",
            petunjuk: "nama - penyebab - jenis - gejala",
            struktur: ["herpes","herpes","virus","gatal"]
      },
      {
            gambar: null,
            subjek: "Penyakit pada organ reproduksi wanita",
            petunjuk: "nama - penyebab - jenis",
            struktur: ["kanker serviks","hpv","virus"]
      },
      {
            gambar: null,
            subjek: "Penyakit pada organ reproduksi wanita",
            petunjuk: "nama - penyebab - jenis - gejala",
            struktur: ["keputihan","candida albicans","jamur","cairan putih"]
      },
      {
            gambar: null,
            subjek: "Penyakit pada organ reproduksi wanita",
            petunjuk: "nama - penyebab - jenis - gejala",
            struktur: ["sifilis","triponema pallidum","bakteri","bercak merah"]
      },
      {
            gambar: null,
            subjek: "Penyakit pada organ reproduksi wanita",
            petunjuk: "nama - penyebab - jenis - gejala",
            struktur: ["HIV AIDS","HIV","virus","imun turun"]
      }
];

soal_organel = [
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - letak",
            struktur: ["nukleus","mengatur","2"]
      },
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - kompabilitas - letak",
            struktur: ["Retikulum Endoplasma","transportasi zat","4"]
      },
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - letak",
            struktur: ["sentriol","pembelahan sel","5"]
      },
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - letak",
            struktur: ["badan golgi","sekresi sel","6"]
      },
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - letak",
            struktur: ["lisosom","sintesis protein","7"]
      },
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - letak",
            struktur: ["mitokondria","energi","8"]
      },
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - letak",
            struktur: ["membran sel","keluar masuk zat","10"]
      },
      {
            gambar: "assets/asset_sel-hewan.png",
            subjek: "Organel pada sel",
            petunjuk: "nama - fungsi - letak",
            struktur: ["sitosplasma","tempat organel","11"]
      }
];

soal_sifatbayangan= [
      {
            gambar: null,
            subjek: "sifat bayangan sesuai ruang pada cermin cekung/lensa cembung",
            petunjuk: "ruang benda - ruang bayangan - sifat (jenis - orientasi - ukuran)",
            struktur: ["1","4","maya tegak diperbesar"]
      },
      {
            gambar: null,
            subjek: "sifat bayangan sesuai ruang pada cermin cekung/lensa cembung",
            petunjuk: "ruang benda - ruang bayangan - sifat (jenis - orientasi - ukuran)",
            struktur: ["2","3","nyata terbalik diperbesar"]
      },
            {
            gambar: null,
            subjek: "sifat bayangan sesuai ruang pada cermin cekung/lensa cembung",
            petunjuk: "ruang benda - ruang bayangan - sifat (jenis - orientasi - ukuran)",
            struktur: ["3","2","nyata terbalik diperkecil"]
      },
      {
            gambar: null,
            subjek: "sifat bayangan sesuai ruang pada cermin cekung/lensa cembung",
            petunjuk: "ruang benda - ruang bayangan - sifat (jenis - orientasi - ukuran)",
            struktur: ["4","1","maya tegak diperkecil"]
      },
      {
            gambar: null,
            subjek: "sifat bayangan sesuai ruang pada cermin cekung/lensa cembung",
            petunjuk: "ruang benda - ruang bayangan - sifat (jenis - orientasi - ukuran)",
            struktur: ["R","R","nyata terbalik sama"]
      },
];

soal_perpindahanmuatan = [
      {
            gambar: null,
            subjek: "Perpindahan muatan benda setelah digosok",
            petunjuk: "benda digosok - penggosok - muatan benda digosok dan muatan penggosok",
            struktur: ["kaca","sutera","+ -"]
      },
      {
            gambar: null,
            subjek: "Perpindahan muatan benda setelah digosok",
            petunjuk: "benda digosok (2) - penggosok - muatan benda digosok - muatan penggosok",
            struktur: ["karet atau ebonit","wol","- +"]
      },
      {
            gambar: null,
            subjek: "Perpindahan muatan benda setelah digosok",
            petunjuk: "benda digosok - penggosok (2) - muatan benda digosok - muatan penggosok",
            struktur: ["plastik","rambut atau wol","- +"]
      },
];

soal_adiktif = [
      {
            gambar: null,
            subjek: "zat adiktif",
            petunjuk: "jenis - pengaruh (2) - contoh",
            struktur: ["narkotika","psikologi dan fisik","ganja heroin kokain morfin"]
      },
      {
            gambar: null,
            subjek: "zat adiktif",
            petunjuk: "jenis - pengaruh - contoh",
            struktur: ["psikotropika","psikologi","ekstasi amfetamin"]
      },
      {
            gambar: null,
            subjek: "zat adiktif lain",
            petunjuk: "contoh - contoh - contoh",
            struktur: ["nikotin","alkohol","kafein"]
      },
];

soal_adiktif2 = [
      {
            gambar: null,
            subjek: "golongan zat adiktif stimulan",
            petunjuk: "meningkatkan kerja tubuh, berikan contoh (7)",
            struktur: ["kokain","ekstasi","sabu","amfetamin","nikotin","kafein"]
      },
      {
            gambar: null,
            subjek: "golongan zat adiktif halusinogen",
            petunjuk: "meningkatkan kerja tubuh dan halusinasi, berikan contoh (2)",
            struktur: ["ganja","LSD"]
      },
      {
            gambar: null,
            subjek: "golongan zat adiktif depresan",
            petunjuk: "menurunkan kerja tubuh, berikan contoh (3)",
            struktur: ["morfin","heroin","putaw"]
      },
];

soal_sincos = [
      {
            gambar: null,
            subjek: "sin",
            petunjuk: "sudut - nilai",
            struktur: ["0","0"]
      },
      {
            gambar: null,
            subjek: "sin",
            petunjuk: "sudut - nilai",
            struktur: ["30","1/2"]
      },
      {
            gambar: null,
            subjek: "sin",
            petunjuk: "sudut - nilai",
            struktur: ["37","3/5"]
      },
      {
            gambar: null,
            subjek: "sin",
            petunjuk: "sudut - nilai",
            struktur: ["45","1/2 akar 2"]
      },
      {
            gambar: null,
            subjek: "sin",
            petunjuk: "sudut - nilai",
            struktur: ["53","4/5"]
      },
      {
            gambar: null,
            subjek: "sin",
            petunjuk: "sudut - nilai",
            struktur: ["60 120","1/2 akar 3"]
      },
      {
            gambar: null,
            subjek: "sin",
            petunjuk: "sudut - nilai",
            struktur: ["90","1"]
      },

      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["0","1"]
      },
      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["30","1/2 akar 3"]
      },
      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["37","4/5"]
      },
      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["45","1/2 akar 2"]
      },
      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["53","3/5"]
      },
      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["60","1/2"]
      },
      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["90","0"]
      },
      {
            gambar: null,
            subjek: "cos",
            petunjuk: "sudut - nilai",
            struktur: ["120","-1/2"]
      }

]


//change mechanism
const elementIndicator = document.getElementById("indicator")

function changeSoalTo(namaSoal,pesanSoal) {
      playSetting();
      soal = namaSoal;
      console.log("Soal telah diubah ke soal " + pesanSoal);
      elementIndicator.textContent = "saat ini = " + pesanSoal;
      terminate();
      document.getElementById("buttonStart").click()
}

const elementGambar = document.getElementById("element_gambar");
elementGambar.style.opacity = "0";

//easy setting, ganti ke paket soal disini
soal = soal_sincos;

//when submit
function getSoal() {
      document.getElementById("buttonNext").disabled = false;
      playNext();
      elementContainer.textContent = "";
      soalIndex = Math.floor(Math.random() * soal.length);
      if (soalIndex == prevsoal) {
            soalIndex = Math.floor(Math.random() * soal.length);
      }
      console.log(soalIndex);
      currentSoal = soal[soalIndex];
      if (currentSoal.gambar == null) {
            elementGambar.src = "assets/asset_null.png";
            elementGambar.style.display = "none"
      } else {
            elementGambar.src = currentSoal.gambar;
            elementGambar.style.display = "inline"
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
      } else { 
            elementRedactedInput.style.borderColor = "red";
            elementRedactedInput.style.color = "red";
            elementRedactedInput.value = elementRedactedInput.value+ " (" + elementRedactedValue + ")";
            playWrong();
      };
      setTimeout(getSoal, 650);
};

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

//put to the menu

//small note : Athaya x Yumna is canon >///< XD