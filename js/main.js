'use strict';

{
  const date = document.getElementById("date");  
  const type = document.getElementById("type");  
  const set1 = document.getElementById("set1");
  const set2 = document.getElementById("set2");
  const set3 = document.getElementById("set3");

  let infoArray = [];
  let count = 0;

  const clear = document.getElementById('clear');

  clear.addEventListener('click', () => {
    localStorage.clear();
    document.location.reload();
  });

  const submit = document.getElementById('submit');
  submit.addEventListener('click', () => {
    infoArray.push({
      date: date.value,
      type: type.value,
      set1: set1.value,
      set2: set2.value,
      set3: set3.value,
      count: count,
    });

    const json = JSON.stringify(infoArray[count]);
    localStorage.setItem(count, json);
    document.location.reload();
  });

  if (localStorage.length === 0) {
        // 空文
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let obj = JSON.parse(localStorage.getItem(key));

      infoArray.push(obj);
    }

    for(let outer = 0; outer < infoArray.length -1; outer++){
      for(let i = infoArray.length-1; i > outer; i--){    
        if(infoArray[i].date < infoArray[i-1].date){
          let tmp = infoArray[i];
          infoArray[i] = infoArray[i-1];
          infoArray[i-1] = tmp;
        }
      }
    }

    infoArray.forEach((data, index) => {
      const log1 = document.createElement('div');
      const log2 = document.createElement('div');
      const log3 = document.createElement('div');
      log3.classList.add('flexContainer');
      const del = document.createElement('button');
      
      const set1 = document.createElement('span');
      const set2 = document.createElement('span');
      const set3 = document.createElement('span');

      const bigLog = document.createElement('div');
      bigLog.classList.add('stack');

      log1.textContent = data.date;
      log2.textContent = data.type;
      del.textContent = 'delete';

      set1.textContent = data.set1
      set2.textContent = data.set2
      set3.textContent = data.set3

      bigLog.appendChild(log1);
      bigLog.appendChild(log2);
      bigLog.appendChild(log3);

      log3.appendChild(set1);
      log3.appendChild(set2);
      log3.appendChild(set3);

      bigLog.appendChild(del);

      document.getElementById('record').appendChild(bigLog);

      count = localStorage.length;

      del.addEventListener('click', () => {
        localStorage.removeItem(data.count);
        document.location.reload();
      });
    });
  }
  const result = document.getElementById('result');
  result.addEventListener('click', () => {
    window.location.href = 'result.html';
  });
}