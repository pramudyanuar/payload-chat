<script setup lang="ts">
import { ref } from 'vue';

const isLoggedIn = ref(false);
const isSignUp = ref(false);
const email = ref('');
const password = ref('');
const username = ref('');
const joined = ref(false)
const user = ref();
const chatLog = ref('');
const input = ref('');
const channels = ref();
const channelId = ref('');
const chatSelected = ref(false);


async function funcLogin() {
  try {
    const data = {
      email: email.value,
      password: password.value
    };

    const req = await fetch('http://localhost:3000/api/accounts/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (req.status >= 500) {
      console.log('server error');
    } else if (req.status >= 400) {
      console.log('bad request');
    } else {
      const res = await req.json();
      alert("Log In Successfull");

      isLoggedIn.value = true;
      user.value = res.user;

      console.log(res);
      console.log('success');
    }

  } catch (error) {
    console.log(error);
  }
}

async function funcLogout() {
  try {
    const req = await fetch('http://localhost:3000/api/accounts/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (req.status >= 500) {
      console.log('server error');
    } else if (req.status >= 400) {
      console.log('bad request');
    } else {
      isLoggedIn.value = false;
      alert("Log Out Successfull");
      console.log('success');
    }
  } catch (error) {
    console.log(error);
  }
}

async function funcGetChannel() {
  try {
    const req = await fetch('http://localhost:3000/api/channels/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (req.status >= 500) {
      console.log('server error');
    } else if (req.status >= 400) {
      console.log('bad request');
    } else {
      const res = await req.json();
      channels.value = res.docs;
      console.log(res);
      console.log('success');
    }
  } catch (error) {
    console.log(error);
  }
}

async function funcFindChannel(channelID) {
  try {
    channelId.value = channelID;
    chatSelected.value = true;
    const req = await fetch(`http://localhost:3000/api/channels/${channelID}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (req.status >= 500) {
      console.log('server error');
    } else if (req.status >= 400) {
      console.log('bad request');
    } else {
      const res = await req.json();
      chatLog.value = res.chatHistory;
      console.log(res);
      console.log('success');
    }
  } catch (error) {
    console.log(error);
  }
}

async function funcSendText() {
  try {
    const newChatEntry = {
      sender: user.value.username,
      message: input.value,
    };

    const data = {
      chatHistory: [...chatLog.value, newChatEntry],
    };

    const req = await fetch(`http://localhost:3000/api/channels/${channelId.value}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (req.status >= 500) {
      console.log('server error');
    } else if (req.status >= 400) {
      console.log('bad request');
    } else {
      console.log('success');
      await funcFindChannel(channelId.value);
    }

  } catch (error) {
    console.log(error);
  }
}

async function funcCreateChannel() {
  try {
    const data = {
      authorID: user.value.id,
    };

    const req = await fetch(`http://localhost:3000/api/channels/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (req.status >= 500) {
      console.log('server error');
    } else if (req.status >= 400) {
      console.log('bad request');
    } else {
      console.log('success');
      await funcGetChannel();
    }

  } catch (error) {
    console.log(error);
  }
}

async function funcSignup() {
  try {
    const data = {
      email: email.value,
      password: password.value,
      username: username.value
    };

    const req = await fetch('http://localhost:3000/api/accounts/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (req.status >= 500) {
      console.log('server error');
    } else if (req.status >= 400) {
      console.log('bad request');
    } else {
      const res = await req.json();

      alert("Sign Up Successfull, Please Log In");
      user.value = res.doc;
      isSignUp.value = false;

      console.log(res);
      console.log('success');
    }
  } catch (error) {
    console.log(error);
  }
}

function funcSUorLI() {
  isSignUp.value = !isSignUp.value;
}

</script>

<template>
  <div class="full-container">
    <div v-if="!isLoggedIn">
      <div v-if="!isSignUp">
      <img src="../src/assets/logo.png" alt="" style="width: 200px;">
      <h1>Log In Page</h1>
      <form @submit.prevent="">
        <label for="Email" style="color: white">Email : </label>
        <input type="email" id="email" v-model="email" style="width: 150px;">
        <br>
        <label for="Password" style="color: white">Password : </label>
        <input type="password" id="password" v-model="password" style="width: 150px;">
        
      </form>
        <br>
        <button @click="funcLogin">Login</button>
        <br>
        <p>Don't have an account? <span @click="funcSUorLI" > <a href="#"> Sign Up here </a> </span></p>
      </div>

      <div v-if="isSignUp">
      <img src="../src/assets/logo.png" alt="" style="width: 200px;">
      <h1>Sign Up Page</h1>
      <form @submit.prevent="">
        <label for="Email" style="color: white">Email : </label>
        <input type="email" id="email" v-model="email" style="width: 150px;">
        <br>
        <label for="Password" style="color: white">Password : </label>
        <input type="password" id="password" v-model="password" style="width: 150px;">
        <br>
        <label for="Username" style="color: white">Username : </label>
        <input type="username" id="username" v-model="username" style="width: 150px;" >
      </form>
        <br>
        <button @click="funcSignup();">Sign Up</button>
        <br>
        <p>Already have an account? <span @click="funcSUorLI" > <a href="#"> Log In here </a> </span></p>
      </div>
    </div>

    <div v-if="isLoggedIn">
      <h1>A Better Version Of WhatsApp</h1>
      <br>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h1>Your Profile</h1>
            <img src="https://i.ibb.co/SRnsBjH/360-F-64676383-Ldbmhi-NM6-Ypzb3-FM4-PPu-FP9r-He7ri8-Ju.jpg" alt="360-F-64676383-Ldbmhi-NM6-Ypzb3-FM4-PPu-FP9r-He7ri8-Ju" border="0" style="width: 100px;">
            <p>User ID : {{ user.id }}</p>
            <p>Username : {{ user.username }}</p>
            <p>Email : {{ user.email }}</p>
            <br>
            <button @click="funcLogout">Logout</button>
          </div>

          <div class="col-md-3">
            <h1>Channels</h1>
              <div v-if="!joined">
                  <button @click="funcCreateChannel">create new channel</button>
                  <div v-for="channel in channels" :key="channel.id">
                    <p> - <span @click="funcFindChannel(channel.id)"><a href="#">{{ channel.id }}</a></span></p>
                </div>
              </div>
          </div>
          
          <div class="col-md-5">
            <h1>Chats</h1>
              <div v-if="chatSelected">
                <div v-for="log in chatLog" :key="log.id">
                  <p>{{ log.sender }}: {{ log.message }}</p>
                </div>
                <input type="text" v-model="input">
                <button @click="funcSendText">send</button>
              </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
