# # Course manager (backend)

．A RESTful API server built with Node.js, Express framework, and MySQL. 

．JSON Web Token for user authtication.

## Features
>
- [ ] User can signup, login and logout from the web
- [ ] User need to login to access personal info and course details.
- [ ] Users' role: Admin, teachers, students
- [ ] All user can view all courses
- [ ] Teachers and students can CRUD own courses/enrollments.
- [ ] Teachers and students can edit personal info.
- [ ] Admin can CRUD courses/enrollments and edit personal info.

## Install
1. Clone the project to local.
```shell
// HTTPS
git clone https://github.com/yaahsin/Course-manager.git
```
2. Move to folder
`cd Course-manager`
3. Install all packages (some of it might not in use at the moment)
`npm install` 
4. Create environment variables (see: .env.example)
5. Create MySQL database: course manager; set username and password at config.json
6. Setting and creating seeder: `npx sequelize db:migrate`  `npx sequelize db:seed:all`
7. Run the project `npm run dev`  (nodemon)
8. If the terminal display `App is running on port 3000`, the API server is ready now!

## API Documents
[API documents ](https://messy-freon-8a8.notion.site/API-_V1-6f16bebc0fe1447bb33c71cf2b079ab4)

---
**Built with** 

- Node.js v16.14.2
- express v4.17.1
- jsonwebtoken:  8.5.1
- passport:  v0.4.1
- passport-jwt: v4.0.0
- passport-local:  v1.0.0
- bcryptjs: v2.4.3
- mysql2: v2.1.0
- sequelize:  v5.21.13
- sequelize-cli: v5.5.1
- method-override: v3.0.0
- connect-flash: v0.1.1
- dayjs:  v1.10.3
- express-handlebars:  5.3.3
- faker:  v4.1.0
- dotenv:  v10.0.0

## Additional info

> [User story](https://messy-freon-8a8.notion.site/User-Story-1c84f9044e4b45cca10faa8a1ef8ab56)

>  [UI design](https://www.figma.com/file/0zfvJHQcfFW8N3DSFm2uAE/Capstone:-course-manager_2022?node-id=0:1)

> [ERD](https://messy-freon-8a8.notion.site/ERD-9fe0695edd1344b4ae869fcd2148cef9)




**Contributor**
[Yaya](https://github.com/yaahsin)
