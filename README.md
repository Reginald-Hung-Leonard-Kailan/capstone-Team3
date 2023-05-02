# Coaches Corner
> A web application that helps coaches manage their clients.

Fitness coaches often struggle to manage clients effectively using multiple resources, which can lead to inefficiencies and lost time. Coaches Corner provides a comprehensive solution, including injury reporting and personalized coaching tools, to help coaches streamline their workflow and manage clients more efficiently. With Coaches Corner, fitness coaches can focus on delivering quality coaching, while our platform handles the administrative tasks, saving time and improving overall efficiency.

![](header.png)

## Local Setup

1. Fork the Repo
2. Clone the Repo to your IDE
3. Ensure your application.properties file has a mySQL Database and an account that can CRUD that Database.

```sh
spring.datasource.url=jdbc:mysql://localhost/random_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.datasource.hikari.maximum-pool-size=4
```

## Release History


* 0.1.0
    * The first proper release
    * LIVE SITE: [coachescorner.me](https://www.coachescorner.me)
    * FEAT: chart.js and chartingjs for rendering data
    * SECURITY: spring security
* 0.0.1
    * Work in progress

## Developers

Leo K. – [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" width="20"/>](https://github.com/karolyleo)
Hung H. – [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" width="20"/>](https://github.com/Hunghho)
Reginald G. – [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" width="20"/>](https://github.com/ReginaldGraham)
Kailan Z. – [<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" width="20"/>](https://github.com/KailanZwas)
