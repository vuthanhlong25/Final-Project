const components = {}
components.welcomeScreen = `
<h1>Welcome to Chat app</h1>

`
components.registerScreen = `   <div class="register-container">
<div class="aside-right">
    <div class="header">
        <h3>LOPO Message</h3>
    </div>
<form id="register-form">
    <div class="input-name-wrapper">
        <div class="input-wrapper">
            <input type="text" name="firstName" placeholder="First Name">
            <div class="error" id="first-name-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="text" name="lastName" placeholder="Last Name">
            <div class="error" id="last-name-error"></div>
        </div>
    </div>
    <div class="input-wrapper">
        <input type="text" name="email" placeholder="Email">
        <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div class="error" id="password-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" name="confirmPassword" placeholder="Confirm Password">
        <div class="error" id="confirm-password-error"></div>
    </div>
    <div class="form-action">
        <span id="redirect-to-login" onclick="goToLogin()">
            Already have an account? Log in
        </span>
        <button class="btn" type="submit">Register</button>
    </div>

</form>    
</div>
</div>`

components.loginScreen = `<div class="login-container">
<div class="aside-right">
    <div class="header">
        <h3>Log In</h3>
    </div>
<form id="login-form" action="">
    <div class="input-wrapper">
        <input type="text" name="email" placeholder="Email...">
        <div class="error" id="email-error"></div>
    </div>
    <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password...">
        <div class="error" id="password-error"></div>
    </div>
    <div class="form-action">
    <span id="redirect-to-register" onclick="goToRegister()">Don't have an account yet? Register</span>
        <button class="btn" type="submit">Login</button>
    </div>
</form> 
</div>
</div>

`
components.introScreen = (a) => {
return (`
<div class="welcome-container">
<div class="welcome-user">
    <h2>Welcome, ${a}! </h2>
</div>
<div class="welcome-slogan">
    <h3>Stay in touch with everyone everywhere!</h3>
    <h5>a good relationship starts from a good conversation or<br> communication so get connected and stay in touch <br> with people you care about.</h5>
    <button class="btn" id="redirect-to-chat" onclick="goToChat()">Start a new conversation</button>
</div>
</div>
`)
}

components.chatScreen = `  <div class="chat-container">
<div class="header">
    MindX Chat
</div>
<div class="main">
<div class="aside-left">
                <div class="create-conversation">
                    <button class="btn">+ New conversation</button>
                </div>
                <div class="list-conversations">
                </div>
            </div>
    <div class="conversation-detail">
    
        <div class="conversation-header">
            First Conversation
        </div>
        <div class="list-messages">
            

        </div>
        <form id="send-message-form">
            <div class="input-wrapper">
                <input type="text" name="message" placeholder="Type a message">
            </div>
            <button type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
        </form>
    </div>
    <div class="aside-right">
                <div class="list-user">
                    <div class="user">
                        long8amtqyn@gmail.commmmmmmmasdasd
                    </div>
                </div>
                    <form id="add-user-form">
                        <div class="input-wrapper">
                            <input type="text" placeholder="Input friend email" name="email">
                            <div class="error" id="add-user-email-error"></div>
                        </div>
                        <button class="btn" type="submit" id="add-user">Add</button>
                    </form>

            </div>
</div>
</div>
`
components.createConversation = ` <div class="create-conversation-container">
<div class="header">
    MindX chat
</div>
<div class="main" style="padding: 50px 20%">
    <form id="create-conversation-form">
        <div>
            Create a new conversation
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Conversation Name" name="conversationTitle">
            <div class="error" id="conversation-name-error">
            </div>
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Friend's Email" name="conversationEmail">
            <div class="error" id="conversation-email-error">
            </div>
        </div>
        <button type="submit" class="btn">Save</button>
        <button type="submit" class="btn btn-light" id="back-to-chat">Cancel</button>
    </form>
</div>
</div>
`