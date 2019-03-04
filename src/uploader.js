import { upload, download } from './service';
export default class Uploader {
  constructor() {
    var self = this;
    self.btnImage();
  }

  btnImage = () => {
    var self = this;
    const preview = document.getElementById('preview');
    const miniPreview = document.getElementById('uploaded-image');
    const input = document.getElementById('chooseImgButton');
    input.addEventListener(
      'change',
      function () {
        const file = input.files[0];
        let base64 = '';
        const reader = new FileReader();

        reader.onloadend = () => {
          base64 = reader.result;
          base64 = base64.replace(/^.*base64,/, '');
          self.uploadImg(reader.result);
        };
        reader.readAsDataURL(input.files[0]);
      },
      false
    );
  };

  uploadImg = b64 => {
    var self = this;
    upload(b64)
      .then(res => {
        self.downloadJSON(res.data.uri);
      })
      .catch(error => {
        console.log(error);
      });
  };

  downloadJSON = uri => {
    const preview = document.getElementById('preview');
    const miniPreview = document.getElementById('uploaded-image');
    download(uri)
      .then(res => {
        preview.style.backgroundImage = 'url(' + res.data.img + ')';
        miniPreview.style.background = 'url(' + res.data.img + ')';
      })
      .catch(error => {
        console.log(error);
      });
  };
  /*

    1. Gunakan tombol #chooseImgButton untuk memilih file gambar untuk diupload
    2. Tampilkan gambar sebagai background elemen #preview
    3. Gunakan service.upload() untuk upload gambar dalam bentuk file JSON. 
       Server akan memberi respon dalam bentuk JSON juga. Di dalamnya ada info tentang URL JSON diupload.
    4. Gunakan service.download() untuk mendownload JSON dari URL di atas.
    5. Tampilkan file base64 yang ada di dalam file JSON di atas sebagai background elemen #uploaded-image

    Contoh hasil akhir: https://www.dropbox.com/s/gypiplh5utq62re/img-uploader.mp4?dl=0
    
    Catatan: Anda hanya perlu mengedit file ini saja.
  */
}
