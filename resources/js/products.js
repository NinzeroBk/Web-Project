window.onload= function(){

    var conditie2 = false;

    var rng=document.getElementById("inp-pret");
    rng.onchange=function(){
        
        
        var info = document.getElementById("infoRange");
        console.log(info)//returneaza null daca nu gaseste elementul
        
        if(!info){
            info=document.createElement("span");
            info.id="infoRange"
            this.parentNode.appendChild(info);
        }
        info.innerHTML="("+this.value+")";
    }

    var btn=document.getElementById("filtrare");
    btn.onclick=function(){
        var articole=document.getElementsByClassName("product");
        
        for(let art of articole){
            console.log("Btn push")
            art.style.display="none";

            /*
            v=art.getElementsByClassName("nume")
            nume=v[0]*/
            var nume=art.getElementsByClassName("name-val")[0];//<span class="val-nume">aa</span>
            var conditie1=nume.innerHTML.startsWith(document.getElementById("inp-nume").value)
            console.log(nume)
            var warranty_value=art.getElementsByClassName("warranty-val")[0].innerHTML;
            console.log("warranty-value="+warranty_value);

            conditie2 = warranty_value>=rng.value;

            console.log("conditie2="+conditie2);

            var radbtns=document.getElementsByName("gr_rad");
            for (let rad of radbtns){
                if (rad.checked){
                    var valCalorii=rad.value;//poate fi 1, 2 sau 3
                    break;
                }
            }

            var caloriiArt= art.getElementsByClassName("child_proof-val")[0].innerHTML;
            var conditie3=false;
            switch (valCalorii){
                case "1": conditie3= (caloriiArt=="true"); console.log("case1cond3="+conditie3); break;
                case "2": conditie3= (caloriiArt=="false");console.log("case2cond3="+conditie3); break;
                default: conditie3=true;
            }
            


            if(conditie1 && conditie2 && conditie3)
                art.style.display="block";
            
        }
    }


    function sorteaza(semn){
        var articole=document.getElementsByClassName("product");
        var v_articole=Array.from(articole);
        v_articole.sort(function(a,b){
            var pret_a=parseInt(a.getElementsByClassName("price-val")[0].innerHTML);
            var pret_b=parseInt(b.getElementsByClassName("price-val")[0].innerHTML);
            if(pret_a!=pret_b){
                return semn*(pret_a-pret_b);
            }
            else{
                var nume_a=a.getElementsByClassName("purpose-val")[0].innerHTML;
                var nume_b=b.getElementsByClassName("purpose-val")[0].innerHTML;
                {
                    return semn*nume_a.localeCompare(nume_b);
                }
            }
        });
        for(let art of v_articole){
            art.parentNode.appendChild(art);
        }
    }

    var btn2=document.getElementById("sortCrescNume");
    btn2.onclick=function(){
        sorteaza(1)
    }

    var btn3=document.getElementById("sortDescrescNume");
    btn3.onclick=function(){
        sorteaza(-1)
    }


    document.getElementById("resetare").onclick=function(){
        console.log("reset-click")
        //resetare inputuri
        document.getElementById("i_rad4").checked=true;
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("infoRange").innerHTML="("+document.getElementById("inp-pret").min+")";
        document.getElementById("inp-nume").value=""
        //de completat...


        //resetare articole
        var articole=document.getElementsByClassName("product");
        for(let art of articole){

            art.style.display="block";
        }
    }
 }
