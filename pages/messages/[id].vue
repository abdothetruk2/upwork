<template>
  <div class="bg-white min-h-screen">
    <div class="container-custom py-6">
      <div class="flex items-center mb-6">
        <NuxtLink to="/messages" class="text-neutral-500 hover:text-neutral-700 mr-4">
          <Icon name="heroicons:arrow-left" class="h-5 w-5" />
        </NuxtLink>
        <h1 class="text-2xl font-bold">Conversation with {{ contact.name }}</h1>
      </div>
      
      <div class="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
        <div class="flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
          <!-- Chat Header -->
          <div class="p-4 border-b border-neutral-200 flex justify-between items-center">
            <div class="flex items-center">
              <div class="relative">
                <div class="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img :src="contact.avatar" :alt="contact.name" class="h-full w-full object-cover" />
                </div>
                <div 
                  v-if="contact.online" 
                  class="absolute bottom-0 right-1 h-2.5 w-2.5 rounded-full bg-success-500 border-2 border-white"
                ></div>
              </div>
              <div>
                <div class="font-medium">{{ contact.name }}</div>
                <div class="text-xs text-neutral-500">
                  {{ contact.online ? 'Online' : 'Last seen ' + contact.lastSeen }}
                </div>
              </div>
            </div>
            <div>
              <button class="text-neutral-500 hover:text-neutral-700 p-2">
                <Icon name="heroicons:phone" class="h-5 w-5" />
              </button>
              <button class="text-neutral-500 hover:text-neutral-700 p-2">
                <Icon name="heroicons:video-camera" class="h-5 w-5" />
              </button>
              <button class="text-neutral-500 hover:text-neutral-700 p-2">
                <Icon name="heroicons:ellipsis-vertical" class="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <!-- Messages -->
          <div ref="messagesContainer" class="flex-grow p-4 overflow-y-auto bg-neutral-50">
            <div 
              v-for="(message, index) in conversation"
              :key="index"
              class="mb-4 max-w-[75%]"
              :class="[
                message.sender === 'me' ? 'ml-auto' : 'mr-auto'
              ]"
            >
              <div 
                class="rounded-lg px-4 py-2"
                :class="[
                  message.sender === 'me' 
                    ? 'bg-primary-500 text-white rounded-tr-none'
                    : 'bg-white shadow-sm border border-neutral-200 rounded-tl-none'
                ]"
              >
                {{ message.text }}
              </div>
              <div 
                class="text-xs mt-1"
                :class="[
                  message.sender === 'me' ? 'text-right text-neutral-500' : 'text-neutral-500'
                ]"
              >
                {{ message.time }}
                <span v-if="message.sender === 'me'" class="ml-1">
                  <Icon 
                    name="heroicons:check" 
                    class="h-3 w-3 inline"
                    :class="message.read ? 'text-primary-500' : 'text-neutral-400'"
                  />
                </span>
              </div>
            </div>
            
            <div v-if="isTyping" class="flex items-center text-sm text-neutral-500 mb-4">
              <div class="h-8 w-8 rounded-full overflow-hidden mr-2">
                <img :src="contact.avatar" :alt="contact.name" class="h-full w-full object-cover" />
              </div>
              <div class="bg-white shadow-sm border border-neutral-200 rounded-lg rounded-tl-none px-4 py-2">
                <div class="flex space-x-1">
                  <div class="h-2 w-2 rounded-full bg-neutral-400 animate-bounce"></div>
                  <div class="h-2 w-2 rounded-full bg-neutral-400 animate-bounce" style="animation-delay: 0.2s"></div>
                  <div class="h-2 w-2 rounded-full bg-neutral-400 animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Message Input -->
          <div class="p-4 border-t border-neutral-200">
            <div class="flex items-center">
              <button class="text-neutral-500 hover:text-neutral-700 p-2">
                <Icon name="heroicons:paper-clip" class="h-5 w-5" />
              </button>
              <input
                type="text"
                v-model="newMessage"
                placeholder="Type a message..."
                class="input flex-grow mx-2"
                @keyup.enter="sendMessage"
              />
              <button 
                class="p-2 rounded-full bg-primary-500 text-white disabled:bg-neutral-300"
                :disabled="!newMessage.trim()"
                @click="sendMessage"
              >
                <Icon name="heroicons:paper-airplane" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  layout: 'default'
});

const route = useRoute();
const contactId = Number(route.params.id);

// Message input and state
const newMessage = ref('');
const messagesContainer = ref(null);
const isTyping = ref(false);

// Sample data (in a real app, fetch from API)
const contact = ref({
  id: contactId,
  name: 'Alex Morgan',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  online: true,
  lastSeen: '2 hours ago'
});

const conversation = ref([
  { sender: 'them', text: 'Hi Sarah, I saw your profile and I\'m impressed with your work.', time: 'Yesterday, 4:30 PM', read: true },
  { sender: 'me', text: 'Thank you! I appreciate that. What kind of project do you have in mind?', time: 'Yesterday, 4:35 PM', read: true },
  { sender: 'them', text: 'We need help building an e-commerce platform. I like your previous work in this area.', time: 'Yesterday, 4:40 PM', read: true },
  { sender: 'me', text: 'That sounds interesting! I\'d be happy to discuss more details.', time: 'Yesterday, 4:45 PM', read: true },
  { sender: 'them', text: 'Great! I\'ve reviewed your proposal and would like to schedule a call to discuss the project in more detail.', time: 'Today, 10:30 AM', read: true },
  { sender: 'them', text: 'Would tomorrow at 2 PM EST work for you?', time: 'Today, 10:32 AM', read: true }
]);

// Send a message
function sendMessage() {
  if (!newMessage.value.trim()) return;
  
  // Add message to conversation
  conversation.value.push({
    sender: 'me',
    text: newMessage.value,
    time: 'Just now',
    read: false
  });
  
  // Clear input
  newMessage.value = '';
  
  // Scroll to bottom
  nextTick(() => {
    scrollToBottom();
    simulateReply();
  });
}

// Scroll to bottom of messages
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

// Simulate typing and reply
function simulateReply() {
  // Show typing indicator
  isTyping.value = true;
  
  // Simulate reply after a delay
  setTimeout(() => {
    isTyping.value = false;
    
    // Add reply message
    const replies = [
      'That sounds great!',
      'Thanks for letting me know.',
      'I agree with your approach.',
      'Can we discuss this further tomorrow?',
      'Perfect, looking forward to working with you!'
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    conversation.value.push({
      sender: 'them',
      text: randomReply,
      time: 'Just now',
      read: true
    });
    
    // Mark previous messages as read
    conversation.value = conversation.value.map(msg => {
      if (msg.sender === 'me' && !msg.read) {
        return { ...msg, read: true };
      }
      return msg;
    });
    
    // Scroll to bottom
    nextTick(() => {
      scrollToBottom();
    });
  }, 2000);
}

onMounted(() => {
  // Scroll to bottom of messages on mount
  nextTick(() => {
    scrollToBottom();
  });
});
</script>