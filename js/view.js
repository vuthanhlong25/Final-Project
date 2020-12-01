const view = {}
view.setActiveScreen = (screenName,fromCreateConversation) => {
    switch (screenName){
        case 'welcomeScreen':
            document.getElementById('app').innerHTML = components.welcomeScreen
        break;

        case 'loginScreen':
            document.getElementById('app').innerHTML = components.loginScreen

             const loginForm = document.getElementById('login-form')
             loginForm.addEventListener('submit',(event)=> {
                 event.preventDefault()
                 loginForm.email.value = loginForm.email.value.trim() 
                 const data = {
                     email: loginForm.email.value,
                     password: loginForm.password.value
                 }
                 console.log(data)
                 controller.login(data)
            })

        break;
        
        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
        const registerForm = document.getElementById('register-form')
        registerForm.addEventListener('submit',(event) => {
            event.preventDefault()
            const data = {
                firstName: registerForm.firstName.value,
                lastName: registerForm.lastName.value, 
                email: registerForm.email.value, 
                password: registerForm.password.value, 
                confirmPassword: registerForm.confirmPassword.value
            }
            console.log(data)
            controller.register(data)
        })
        break;

        case 'introScreen': 
            document.getElementById('app').innerHTML = components.introScreen(model.currentUser.displayName)
        break;

        case 'chatScreen':
            // document.getElementById('app').innerHTML = components.chatScreen(model.currentUser.displayName)
            document.getElementById('app').innerHTML = components.chatScreen
            const sendMessageForm = document.getElementById('send-message-form')
            // const listMessages =  view.getCurrentMessage();
            // listMessages.then((response)=> {
            //     for (let i=0; i<response.length;i++){
            //         view.addMessage(response[i])
            //     }
            // })
            if (!fromCreateConversation){
                model.loadConversations()     
                model.listenConversationsChange()  
            } else{
                view.showConversations()
                view.showCurrentConversation()
            }
            
            document.querySelector('.create-conversation .btn').addEventListener('click',() => {
                view.setActiveScreen('createConversation')
            })
            //Thêm email vào cuộc trò chuyện
            const addUserForm = document.getElementById('add-user-form')
            addUserForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const user = addUserForm.email.value.trim()   
                model.addUser(user)
                addUserForm.email.value = ''
                })
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const message = {
                    content: sendMessageForm.message.value.trim(),
                    owner: model.currentUser.email,
                    creatAt: new Date().toISOString()
                }
                
                // view.addMessage(message)
                model.addMessage(message)
                view.scrollToEndElement()
                sendMessageForm.message.value=''
            })
           
        break;

        case 'createConversation':
            document.getElementById('app').innerHTML = components.createConversation
            document.querySelector('#back-to-chat').addEventListener('click',() => {
                view.setActiveScreen('chatScreen')
            })
            const createConversationForm =  document.getElementById('create-conversation-form')
            createConversationForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = {
          conversationTitle: createConversationForm.conversationTitle.value,
          conversationEmail: createConversationForm.conversationEmail.value
        }
        controller.createConversation(data)
      })
        break;


    }

}
view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    if (message.owner === model.currentUser.email){
        if (message.content!== '')
        {messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
        <div class="content">
        ${message.content}
        </div>`}
    } else {
        if (message.content !==''){
            messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
        <div class="owner">
        ${message.owner}
        </div>
        <div class ="content">
        ${message.content}
        </div>`
    }}
    document.querySelector('.list-messages').appendChild(messageWrapper)

}

// view.getCurrentMessage = async () => {
//     const messages = await firebaseConfig.firestore().collection('conversations').get();
//     const listMessages = messages.docs[0].data().messages; 
//     return listMessages
// }

view.showCurrentConversation = () => { 
    document.querySelector('.list-messages').innerHTML = ``
    //đổi tên cuộc trò chuyện 
    document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title
    for (message of model.currentConversation.messages){
        view.addMessage(message)
    }
    view.scrollToEndElement()
    view.showListUsers(model.currentConversation.users)

}
view.showListUsers = (users) => {
    document.querySelector('.list-user').innerHTML = ''
    for (user of users){
        view.addUser(user)
    }
}
view.showUsers = () => { 
    document.querySelector('.')
}
view.addUser = (user) => {
    const userWrapper = document.createElement('div')
    userWrapper.classList.add('user')
    userWrapper.innerText = user 
    document.querySelector('.list-user').appendChild(userWrapper)
}
view.scrollToEndElement = () => { 
    const element = document.querySelector('.list-messages')
    element.scrollTop = element.scrollHeight 
}
view.showConversations = () => {
    for(oneConversation of model.conversations){
        view.addConversation(oneConversation)
    }
}

view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.className = 'conversation cursor-pointer'
    if(model.currentConversation.id === conversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length} users</div>
    `
    conversationWrapper.addEventListener('click',() => {
        document.querySelector('.current').classList.remove('current')
        conversationWrapper.classList.add('current')
        for(oneConversation of model.conversations){
            if(oneConversation.id === conversation.id){
                model.currentConversation = oneConversation 
            }
        }
        
        //in các tin nhắn của model.currentConversation lên màn hình
        view.showCurrentConversation()
    })

    document.querySelector('.list-conversations').appendChild(conversationWrapper)

}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message
  }