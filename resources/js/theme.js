window.addEventListener("DOMContentLoaded", function(){
    var tema=localStorage.getItem("tema");
    if( !tema){//nu am setat inca o tema
        localStorage.setItem("tema","light");
    }
    else{
        if(tema=="dark")
            document.body.classList.add("dark");

    }
    btn=document.getElementById("change-theme");
    if(btn){
        btn.onclick=function(){
            console.log("click change theme")
            document.body.classList.toggle("dark");
            if(document.body.classList.contains("dark"))
                localStorage.setItem("tema","dark");
            else
                localStorage.setItem("tema","light");
        }
    }
});
