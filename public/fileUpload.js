

//reading in a text file, needs adjusting for the spec
const input = document.querySelector('input')
const textarea = document.querySelector('textarea')

input.addEventListener('change', () => 
{
const files = input.files;

if (files.length == 0) return;

const file = files[0];

let reader = new FileReader();
reader.onload = (e) =>
{
    const file = e.target.result;
    //var info = file.split(',');
    const lines = file.split(/\r\n|\n/);
    textarea.value = lines.join('\n');

};

reader.onerror = (e) => alert(e.target.error.name);
reader.readAsText(file);
});



//splits the file by comma, so user uploads a file purely
//of modules split by comma which this function then works
//with
function readInfo(file)
{
    for (let i = 0; i < file.length; ++i) 
      {
        stuModule = file.split(',')
        setupModule(stuModule);
      }
}

//the split string is sent to this function one by one
//and determines what module it is and then calls that modules
//creation function if its a match
function setupModule(module)
{

    if (module == "math")
    {
        math();
    }
    else if (module == "science")
    {
        science();
    }
    else if (module == "sport")
    {
        sport();
    }
    else if (module == "english")
    {
        english();
    }
    else if (module == "french")
    {
        french();
    }
}

//function for creating each type of module. unsure on how
//to do these, think they should be passed to a constructor
//for the semester profile class below.
function math()
{

}

function science()
{

}

function sport()
{

}

function english()
{

}

function french()
{

}

//a class for a students semester profile object that contains
//all their current modules, which semester theyre in etc.
class studentSemesterProfile
{
   
   
}

let myProfile = new studentSemesterProfile(readInfo);