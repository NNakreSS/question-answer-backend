# Question Answer API

Bu proje bir Soru-Cevap API'sidir. Kullanıcılar, sorular sormak, cevaplamak ve diğer kullanıcıların sorularına cevap vermek , soruları ve cevapları beğenmek için bu API'yi kullanabilirler.
Api içerisinde signup sigin ve admin methodları mevcut.

## Başlangıç

Projeyi yerel makinanıza klonlayın ve bağımlılıkları yüklemek için aşağıdaki adımları izleyin:

```bash
git clone https://github.com/NNakreSS/question-answer-backend.git
cd backend-qa
yarn
```

## Ortam Değişkenleri

 -ilk olarak mongo db ayarlarınızı yaparak bir bağlantı noktarı URl'i edinin
 
 -Bu proje için aşağıdaki ortam değişkenlerini belirtmeniz gerekmektedir. Bunları config/env/config.env dosyasına ekleyebilirsiniz.
```env
PORT=5000
NODE_ENV=development

# MongoDB Bağlantısı
MONGO_URI=mongodb://localhost:27017/question-answer

# Json Web Token
JWT_SECRET_KEY=ersoyunbabaannesiniyemisler
JWT_EXPIRE=10m
JWT_COOKIE=10

# Şifre Sıfırlama
RESET_PASSWORD_EXPIRE=3600000

# NodeMailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

 -projeyi development ortamında çalıştırın
```bash
yarn dev
```

## Kullanım

Proje çalıştıktan sonra, API rotalarına HTTP istekleri gönderebilirsiniz. route listesine erişmek için main roota istek atarak route listi görüntülemeniz yeterli.

![image](https://github.com/NNakreSS/question-answer-backend/assets/87872407/2084647e-0a53-4bd6-b906-4dc46d1861e8)
![image](https://github.com/NNakreSS/question-answer-backend/assets/87872407/886e7ea7-e962-42f3-b8f1-6df95e3ebca3)
