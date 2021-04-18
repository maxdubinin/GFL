
window.addEventListener('DOMContentLoaded', function () {
  

  (function(){
    const USERS_LINK = 'https://jsonplaceholder.typicode.com/users';
    const ul = document.querySelector('.fetch__data');

    function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
}

    fetch(USERS_LINK).then(res => res.json())
        .then(data => {
          
          return data.map(function(item) {
            let li = createNode('li');
            let span = createNode('span');
            span.innerHTML = `name: ${item.name},  
                              phone: ${item.phone}`;
            append(li, span);
            append(ul, li);
          })
          
        })
        .catch(err => {
          console.log('error!!');
        })

  }());






});


