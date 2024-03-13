//Exercise 0
"use strict";

const strings = ['cat', 'hello', 'say', 'Giacomo', 'i'];

for(const str of strings){
    let len = str.length;

    const stringFunct = function(st){
        if(len >= 2){
            let strin = st.slice(0, 2);
            
            return strin.concat('', st.slice(len-2, len));
        }

        return '';
    }

    console.log(stringFunct(str));
}