
// JSON.stringify(x) -> x değişkenini JSON modeline dönüştürür.
// JSON.parse(x) x değişkenini JS Obje modeline dönüştürür.

// boş bir öğr. dizisi
let students = [];
// öğrenci bilgilerini local storage'dan var ise alma
let varMiLocalde = localStorage.getItem('students');

if(varMiLocalde) {    // localstoragede kayıtlı ise
// console.log("localde var")
students = JSON.parse(localStorage.getItem('students'));
} else {              // kayıtlı değilse
students = [];
}


// HTML dosylarına bağlanmak için --> document
// Seçici işlemi için querySelector
const studentForm = document.querySelector('#student-form');

// Öğr. listesini seçme
const studentList = document.querySelector('#student-list');

// Öğr. ekleme butonuna bağlanma
const addButton = document.querySelector('.ekle');saveToLocalStorage

viewStudentList();

// öğrenci bilgilerini local storage'a saklama
function saveToLocalStorage(){
    localStorage.setItem('students',JSON.stringify(students));
}


// ÖĞRENCİ EKLEME İŞLEMLERİ

// studentForm submit olduğunda çalışacak olay
// addEventListener olay ekler ve olayın ismini içinde belirtiriz
studentForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    // form ile submit edildiğinde sayfa yenilendiği için yenilemeyi iptal eder


    // formdaki değerleri almak için
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const number = document.querySelector('#number').value;
    const vize = document.querySelector('#vize').value;
    const final = document.querySelector('#final').value;
    
    // her yeni öğrenci için öğrenci nesnesi oluşturma
    const newStudent = {
        name: name,
        surname: surname,
        number: number,
        vize: Number(vize),
        final: Number(final),
    }


    // yeni öğrenciyi diziye ekleme (dizinin sonuna ekler)
    students.push(newStudent);

    console.log('her yeni öğrenciden biri' , newStudent)

    // formu temizle
    studentForm.reset();

    // öğrenciyi locale kaydetme ve güncelleme
    saveToLocalStorage();


    // öğrenciyi listede görüntüleme fonks.
    viewStudentList()

});

// öğrencileri listede görüntülemek için

console.log('öğrenciler' , students)

function viewStudentList(){
    // liste boş olduğunda görüntülnecek alan
    const emptyList = document.querySelector(".empty");

    if(students.length){ // length dizinin eleman sayısını döner


      if(emptyList){
        emptyList.style.display = 'none'
      }

        studentList.innerHTML = ""; // mevcut içeriği temizler

        students.forEach((oAnkiOgrenci, index) => {
        //    console.log(`${index+1}. ogrenci =>` , oAnkiOgrenci)

        // öğrenci bilgilerini html içeriğine dönüştürme özelliği

        const studentCard = `
        <div class="student-item">
                <div class="student-item-info">
                    <h3>${oAnkiOgrenci.name} ${oAnkiOgrenci.surname} -${oAnkiOgrenci.number}</h3>
                    <span>Vize : ${oAnkiOgrenci.vize} Final : ${oAnkiOgrenci.final}</span>
                    <p>Ortalama : ${((oAnkiOgrenci.vize + oAnkiOgrenci.final) / 2).toFixed(2)}</p>
                </div>
                <div class="student-item-process">
                    <i class="fa-solid fa-pen-to-square edit-button" onclick='editStudent(${index})'></i>
                    <i class="fa-solid fa-trash-can delete-button" onclick='deleteStudent(${index})'></i>
                </div>
        `;

        // öğr. bilgisini içeren eleman oluşturma student-item classı
        const studentItem = document.createElement('div'); // createEelment ile div oluşt.
        studentItem.classList.add('student-item'); // classList add ile parantez içindeki ismi class olarak değişkene ekler
        studentItem.innerHTML = studentCard;
//        console.log('studentList' , studentList)

        const ortalama = ((oAnkiOgrenci.vize + oAnkiOgrenci.final) / 2).toFixed(2)
        if(ortalama > 80) {
            console.log('80den büyük', ortalama)
            studentItem.style.background = '#0bdfee'
        }else if (ortalama > 65){
            console.log('60dan büyük' , ortalama)
            studentItem.style.background = '#ee930b'
        }else if(ortalama > 45){
            console.log('45den büyük' , ortalama)
            studentItem.style.background = '#880bee'
        }else{
            console.log('45den düşük' , ortalama)
            studentItem.style.background = '#ee0b0b'
        }
        // öğr. listeye ekleme // appendChild ile etiket içine ekler
        studentList.appendChild(studentItem)
        });

    } else {
        console.log('boş')    // öğr. dizisi boş old. çalışacak uyarı paragrafı
        
        const forEmpty = `
        <p class="empty">Listenizde öğrenci bulunmamaktadır.</p>
        `
        // innerHTML html koduna erişmeyi sağlar
        studentList.innerHTML = forEmpty;

    }
}

//Öğrenci Silme işlemi
function deleteStudent(gelenIndex) {
    console.log('gelenIndex',gelenIndex)
    // console.log("deleteStudent fonksiyonu çalıştı.", gelenText);
    /* II.YONTEM */
    /* var silmeIslemiIcinDizi = [] 
    const sonuc = students.forEach((oAnkiOgrenci, index)=>{
      // console.log('oAnkiOgrenci',oAnkiOgrenci)
      if (index !== gelenIndex) {//gelen indexe eşit olmayan öğrenciler
        console.log('BU ÖĞRENCİLER GELEN İNDEXE EŞİT OLMAYANDIR',oAnkiOgrenci)
        silmeIslemiIcinDizi.push(oAnkiOgrenci)
      }
    })
    console.log('sonuca gore Students=>',silmeIslemiIcinDizi) */
  
    console.log("Students=>", students);
    //Silinecek dizi elemanın indexi(gelenIndex) öğrenci dizisinde eşit olmayanları listeledik
    /* const sonuc = students.filter((oankiDeger, index) => index !== gelenIndex)*/
    const sonuc = students.filter((oankiDeger, index) => {
      /* TOASTIFY I.YONT.
      // sadece silinecek ogrenci icin
      if (index === gelenIndex) {
        Toastify({
          text: `${oankiDeger.name} adındaki öğrenci listesinden silindi.`,
          duration: 1000
          }).showToast();
      } */
  
      return index !== gelenIndex;
    });
  
    //Silinecek öğrenciyi bulma find() ile
    const silinecekOgr = students.find(
      (oankiDeger, index) => index === gelenIndex
    );
    console.log("silinecekOgr", silinecekOgr);
  
    Toastify({
      text: `${silinecekOgr.name} adındaki öğrenci listesinden silindi.`,
      duration: 1500, 
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  
    // console.log('sonuca gore Students=>',sonuc)
  
    students = sonuc; // filtreleme İşlemine göre öğrenci dizimi güncelleme
  
    console.log('silindikten sonra' , students)
    saveToLocalStorage();
    //localStorage.setItem("students", JSON.stringify(students));
  
    //Öğrencileri görüntüleme fonksiyonu
    viewStudentList();
    
  }

  function editStudent(gelenIndex) {
    // console.log('editStudent Çalıştı.', gelenIndex)
  
    // Güncellenek Öğrenci
    
    //I.YONTEM
    /* const editStudent = students[gelenIndex]
    console.log('editStudent',editStudent) */
    
    //II.YONTEM
    /* const editStudent = students.filter((oAnkiOgrenci,index)=> index === gelenIndex )
    console.log('editStudent',editStudent)  */

    //III.YONTEM
    const editStudent = students.find(
      (oAnkiOgrenci, index) => index === gelenIndex);
    console.log("editStudent", editStudent);
  
    //Form alanlarına öğrenci bilgileri ekleme
    
    document.querySelector("#name").value = editStudent.name;
    document.getElementById("surname").value = editStudent.surname;
    document.getElementById("number").value = editStudent.number;
    document.getElementById("vize").value = editStudent.vize;
    document.querySelector("#final").value = editStudent.final;
  
    // Öğrenciyi silme
    deleteStudent(gelenIndex);
  
    // bilgileri local storage'a kaydet
    savetoLocalStorage();
  }
  

function saveToLocalStorage(){
    localStorage.setItem('students',JSON.stringify((students)));
}

