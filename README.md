Необхідно реалізувати веб-програму для зберігання інформації про фільми. Разом з реалізацією потрібно надати документ, що пояснює архітектуру програми та містить інструкцію із запуску програми. Інформація про фільм:

Унікальний ідентифікатор
Назва фільму
Рік випуску
Формат (VHS, DVD, Blu-ray)
Список акторів (“Ім'я та прізвище актора”)
Функції, які має підтримувати система:

Додати фільм
Видалити фільм
Показати інформацію про фільм
Показати список фільмів, що відсортовані за назвою в алфавітному порядку
Знайти фільм за назвою.
Знайти фільм на ім'я актора.
Імпорт фільмів із текстового файлу (приклад файлу надається “sample_movies.txt”). Файл повинен завантажуватись через веб-інтерфейс.
Завдання необхідно реалізувати як односторінкову програму використовуючи ReactJS з використанням JavaScript/TypeScript, Redux/Redux Toolkit.

В результаті потрібно надати:

Посилання на репозитарій у GitHub з вихідним кодом програми.

У репозитарій із тестовим завданням має бути README із запуском програми та складанням докеру образу.

Програма повинна мати можливість конфігурувати API_URL, що вказує на URL бекенд програми. Наприклад, якщо програма знаходиться на іншому IP адресі, повинна бути можливість вказати його. (e.g. API_URL=http://192.168.1.44:8000/api/v1 )

Вся конфігурація має відбуватися через змінні оточення.

Посилання на образ у DockerHub.

Запуск програми повинен відбуватися в один рядок, згідно з шаблоном: docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 your_super_account/movie

Для запуску програми слід зробити наступне :
1. git clone "link git repo"
2. cd Test
3. npm install ( провсяк випадок )
4. npm run dev
<h1>Важливо!</h1>
- функції додавання та видалення фільмів відбувається лише у профілі Адміна 
        email : admin@example.com
        password : Admin123!
        
Нажаль все зроблено локально та всі дані корегуються в статичних json - файлах та localStorage .

