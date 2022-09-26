const form=document.getElementById('solvecont');
let indexval=document.getElementById('');
let array=[];
for(let p=0;p<9;p++){
    array[p]=[];
}
let rowcheck=0,colcheck=0,val,numnow;
// console.log(`${which}`);
// array=[[1,2,0],[4,8,8],[0,8,9]];
let index,set;
form.addEventListener(('click'),(e)=>{
    // console.log("inside the event lsitener");
    e.preventDefault();
    inputinarr();
})
// form.addEventListener(('click'))

function inputinarr(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            set=`${i}${j}`;
            indexval=document.getElementById(`${set}`).value;
            // console.log(`value is : ${indexval}`);
            if(indexval=='')
            {
                document.getElementById(`${set}`).classList.add('edited');
                indexval=0;
            }
            array[i][j]=indexval;
        }
    }
    sudsolve();//here
}
function sudsolve(){
    if(solve(array,0,0)){//here
        setallvals();
        // console.log("done");
        displaysud();
        document.getElementById('label').innerText="Solved!"
        document.getElementById('label').style.color='#4dff4d';
    }
    else{
        document.getElementById('label').innerText="There may be identical numbers in any of the rows or cols, Cannot solve";
        document.getElementById('label').style.color='red';
        // console.log("Cant solve thsi");
    }
}

function displaysud(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            // console.log(array[i][j]);
        }
    }
}

function setallvals(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            set=`${i}${j}`;
            document.getElementById(`${set}`).value=array[i][j];
        }
    }
}

function displaytemp(){
    // console.log('');
}

function isfilled(array,row,col){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(array[i][j]=='0'){
                row=i;
                col=j;
                return 0;
            }
        }
    }
    return 1;
}

let row,col,a,num;

function solve(array,row,col){
    // numnow=array[row][col];
    if(row==8 && col==9){
        return 1;
    }
    if(col==9){ 
        row++;
        col=0;
    }
    if(array[row][col]!=0){
        // cout<<"yes 3";
        return solve(array,row,col+1);
    }
    for(let i=1;i<10;i++){
            if(issafetoput(i,array,row,col)){
                
                array[row][col]=i;
                if(solve(array,row,col+1)){
                    return 1;
                }
            }
        array[row][col]=0;
        }
    return 0;
}

function issafetoput(a,array,row,col){
    if(numinrow(a,row,array)){
        return 0;
    }
    if(numincol(a,col,array)){
        return 0;
    }
    if(numinbox(a,row,col,array))
        return 0;
    
    return 1;
}

function numinrow(num,row,array){
    for(let i=0;i<9;i++){
        if(array[row][i]==num){
            return 1;
        }
    }
    return 0;
}

function numincol(num,col,array){
    for(let i=0;i<9;i++){
        if(array[i][col]==num){
            return 1;
        }
    }
    return 0;
}

function numinbox(num,row,col,array){
    // let startrow=((row/3))*3;
    let startrow=row - row % 3;
    // let startcol=((col/3))*3;
    let startcol=col - col % 3;
    let endrow=startrow+2;
    let endcol=startcol+2;
    for(startrow; startrow<=endrow; startrow++){
        for(startcol; startcol<=endcol; startcol++){
            if(array[startrow][startcol]==num){
                return 1;
            }
        }
    }
    return 0;
}