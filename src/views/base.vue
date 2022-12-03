<template>
    <div class="common-layout">
        <el-container class="con">
            <el-header class="header">
                <div class="title-font">
                    基因密码
                </div>
            </el-header>
            <el-main>
                <el-input
                    v-model="input"
                    :autosize="{ minRows: 10, maxRows: 10 }"
                    type="textarea"
                    placeholder="探寻你的基因密码"
                    id="text"
                />
                <div class="space"></div>
                <div class="btn-domain">
                    <el-button type="primary" @click="encrypt">编码</el-button>
                    <el-button type="primary" @click="decrypt">破译</el-button>
                    <el-button type="warning" @click="copy">复制</el-button>
                    <el-button type="danger" @click="clear">清除</el-button>
                </div>

            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
  
    
<style lang="css" scoped>
    .common-layout {
        height: 100%;
        background-color: #F2F2F2;
    }
    .con {
        width: 100%;
    }
    .header {
        height: 6rem;
        line-height: 6rem;
        text-align: center;
        color: #fff;
        background-color: #409EFF;
    }
    .title-font {
        font-size: 2rem;
        transform: translateX(3%);
        letter-spacing: 1.5rem;
    }
    .space {
        height: 1rem;
    }
</style>

<script lang="ts">
import { ElMessage } from 'element-plus'
    export default{
        name:"base",
        components:{},
        data(){
            return{
                input: ''
            }
        },
        setup(this) {
            const index = document.getElementById('index')
            if (index) {
                index.style.display = 'none'
            }
        },
        methods:{
            str2binary(str: string) {
                var result = [];
                var list = str.split("");
                for(var i=0;i<list.length;i++){
                    if(i != 0){
                        result.push("*");
                    }
                    var item = list[i];
                    var binaryStr = item.charCodeAt(0).toString(2);
                    result.push(binaryStr);
                }   
                return result;
            },
            binary2str(binaryList: string[]) {
                var result = [];
                for(var i=0;i<binaryList.length;i++){
                    var item = binaryList[i];
                    var asciiCode = parseInt(item, 2);
                    var charValue = String.fromCharCode(asciiCode);
                    result.push(charValue);
                }
                return result.join("");
            },
            
            /**
             * @params {num,m,n}
             *	num: 转换进制的数值
            *	m: M进制 →
            *	n: N进制 ←
            */

            radixNum(num:string,m:number,n:number){
                num = typeof(num) === 'string' ? num : String(num)
                if(m>36 && m<2 || n>36 && n<2) throw new Error('Params [m,n] Between 2-36!')
                let result = parseInt(num,m).toString(n)
                return result
            },
    
            encrypt(){
                var dict:any = {"0":"A","1":"C","2":"D","3":"E","4":"F","5":"G","6":"H","7":"I","8":"K","9":"L","a":"M","b":"N","c":"P","d":"Q","e":"R","f":"S","g":"T","h":"V","i":"W","j":"Y"};
                var geneDict:any = {"A":["GCU","GCC","GCA","GCG"],"C":["UGU","UGC"],"D":["GAU","GAC"],"E":["GAA","GAG"],"F":["UUU","UUC"],"G":["GGU","GGC","GGA","GGG"],"H":["CAU","CAC"],"I":["AUU","AUC","AUA"],"K":["AAA","AAG"],"L":["UUA","UUG","CUU","CUC","CUA","CUG"],"M":["AUG"],"N":["AAU","AAC"],"P":["CCU","CCC","CCA","CCG"],"Q":["CAA","CAG"],"R":["CGU","CGC","CGA","CGG","AGA","AGG"],"S":["UCU","UCC","UCA","UCG","AGU","AGC"],"T":["ACU","ACC","ACA","ACG"],"V":["GUU","GUC","GUA","GUG"],"W":["UGG"],"Y":["UAU","UAC"],"*":["UAA","UAG","UGA"]};
                
                var text = document.getElementById("text") as HTMLInputElement;
                var pwd:string[] = [];
                var res:string[] = [];
                if (text) {
                    var res = this.str2binary(text.value);
                }
                console.log(res.join(""));
                for (var i = 0; i < res.length; i++) {
                    if (res[i] != "*") {
                        res[i] = this.radixNum(res[i], 2, 20);
                    }
                }

                for(var i=0;i<res.length;i++){
                    if (res[i] != "*") {
                        var item:string = res[i];
                        var list:string[] = item.split("");
                        for(var j=0;j<list.length;j++){
                            pwd.push(dict[list[j]]);
                        }
                    } else {
                        pwd.push("*");
                    }  
                }
                for(var i=0;i<pwd.length;i++){
                    var item:string = pwd[i];
                    var list:string[] = geneDict[item];
                    pwd[i] = list[Math.floor(Math.random()*list.length)];
                }
                text.value = pwd.join("");


            },

            decrypt(){
                var dict:any= {"A":"0","C":"1","D":"2","E":"3","F":"4","G":"5","H":"6","I":"7","K":"8","L":"9","M":"a","N":"b","P":"c","Q":"d","R":"e","S":"f","T":"g","V":"h","W":"i","Y":"j"};
                var codeDict:any = {"GCU":"A","GCC":"A","GCA":"A","GCG":"A","UGU":"C","UGC":"C","GAU":"D","GAC":"D","GAA":"E","GAG":"E","UUU":"F","UUC":"F","GGU":"G","GGC":"G","GGA":"G","GGG":"G","CAU":"H","CAC":"H","AUU":"I","AUC":"I","AUA":"I","AAA":"K","AAG":"K","UUA":"L","UUG":"L","CUU":"L","CUC":"L","CUA":"L","CUG":"L","AUG":"M","AAU":"N","AAC":"N","CCU":"P","CCC":"P","CCA":"P","CCG":"P","CAA":"Q","CAG":"Q","CGU":"R","CGC":"R","CGA":"R","CGG":"R","AGA":"R","AGG":"R","UCU":"S","UCC":"S","UCA":"S","UCG":"S","AGU":"S","AGC":"S","ACU":"T","ACC":"T","ACA":"T","ACG":"T","GUU":"V","GUC":"V","GUA":"V","GUG":"V","UGG":"W","UAU":"Y","UAC":"Y","UAA":"*","UAG":"*","UGA":"*"};
                var text = document.getElementById("text") as HTMLInputElement;
                var pwd:string[] = [];

                // Take three letters per circle
                for (var i = 0; i < text.value.length; i += 3) {
                    pwd.push(text.value.substr(i, 3));
                    }
                    
                for(var i=0;i<pwd.length;i++){
                    pwd[i] = codeDict[pwd[i]];
                }

                for(var i=0;i<pwd.length;i++){
                    if (pwd[i] != "*") {
                        pwd[i] = dict[pwd[i]];
                    }
                    else {
                        pwd[i] = "*";
                    } 
                    
                }
                var list = pwd.join("").split("*");
                
                for (var i = 0; i < list.length; i++) {
                    list[i] = this.radixNum(list[i], 20, 2); 
                }
                var result = this.binary2str(list);
                text.value = result;

                },

            copy(){
                var text = document.getElementById("text") as HTMLInputElement;
                text.select();
                document.execCommand("Copy");
                ElMessage({
                    message: 'Copy Success!',
                    type: 'success'
                });
            },

            clear(){
                var text = document.getElementById("text") as HTMLInputElement
                text.value = "";
            }
        }
    }

</script>