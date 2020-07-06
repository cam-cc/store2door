//imports the express module into our code and assigns it to a variable
const express = require("express");
const file = require("fs"); // fs is a core module

//create express app object
const app = express();
const port = 3000;

app.use(express.static("public"));

const htmlTemplate = (title, heading, mainContent) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/users">transcript</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h2 id="heading1">${heading}</h2>
                ${mainContent}
            </main>
            <footer>
                   <b>By Cameron Coenjarts</b>
            </footer>
    </body>
    </html>`
}


app.get("/", (req, res) => {
    const page = `<a href="/users"><img src="https://www.pngitem.com/pimgs/m/248-2482905_every-student-a-graduate-graduates-students-png-transparent.png" height="200" width="300"></a>`;
    res.send(htmlTemplate(`Student portal`, `Home Page`, page));
});

app.get("/users", (req, res) => {

    const page = ` 
        <p>FirstName : ${data.firstName}<br>
        LastName : ${data.lastName}<br>
        Student ID : ${data.studentID}<br>
        Student Type: ${data.studentType}
        </p><br>
        ${Allcourse(data.Courses)}`;
    res.send(htmlTemplate(`Transcript`, `Student Transcript`, page));
})

const getGpa = (c) => {

    let TotalPoint = 0;
    let Credits = 0;
    let point;

    c.forEach(e => {
        if (e.mark < 90) 
            point = 3;
        if (e.mark < 80) 
            point = 2;
        if (e.mark < 70) 
            point = 1;
        if (e.mark < 60) 
            point = 0;
        if (e.mark > 90) 
            point = 4;
        TotalPoint += point * e.credits;
        Credits += e.credits;
    });
    let GPA = 'GPA: ';
    GPA += `${TotalPoint}` / `${Credits}`;
    return GPA;
}
const Allcourse = (c) => {
    let temp = '';
    let table = '';

    c.forEach(e => {
        temp += `<tr>
    <td>${e.code}</td>
    <td>${e.courseTitle}</td>
    <td>${e.credits}</td>
    <td>${e.mark}</td>
    </tr>`;
    })

    table = `<table><tr>
        <th>Course Code</th>
        <th>Title</th>
        <th>Credit</th>
        <th>Mark</th>       
        </tr>
        ${temp}
        <tfoot>
        <td>GPA</td>
        <td>${getGpa(c)}</td>
        </tfoot>        
        </table>`

    return table;

};




app.listen(port, () => {

    console.log("Web Server is running bro!")
});


const data = {

    firstName: "Shantelle",
    lastName: 'Roberts',

    studentID: '000136',

    studentType: 'Advanced Diploma',

    Courses: [{

            code: 'WEB222',

            courseTitle: 'Web Programming Principles',

            credits: 3,

            mark: 92.65
        },

        {
            code: 'WEB322',

            courseTitle: 'Web Programming tools and frameworks',

            credits: 3,

            mark: 82
        }
    ]
};
