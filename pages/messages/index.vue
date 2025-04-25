<template>
  <div class="bg-white min-h-screen">
    <div class="container-custom py-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Messages</h1>
        <button class="btn btn-primary">
          <Icon name="heroicons:pencil-square" class="h-5 w-5 mr-2" />
          New Message
        </button>
      </div>
      
      <div class="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
        <div class="flex h-[calc(100vh-200px)] min-h-[500px]">
          <!-- Contact List -->
          <div class="w-full md:w-1/3 border-r border-neutral-200 flex flex-col">
            <!-- Search -->
            <div class="p-4 border-b border-neutral-200">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="heroicons:magnifying-glass" class="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search messages"
                  class="input pl-10"
                />
              </div>
            </div>
            
            <!-- Contacts -->
            <div class="flex-grow overflow-y-auto">
              <div 
                v-for="contact in filteredContacts" 
                :key="contact.id"
                @click="selectContact(contact)"
                class="p-4 border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors"
                :class="selectedContact?.id === contact.id ? 'bg-primary-50' : ''"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="relative">
                      <div class="h-12 w-12 rounded-full overflow-hidden mr-3">
                        <img :src="contact.avatar" :alt="contact.name" class="h-full w-full object-cover" />
                      </div>
                      <div 
                        v-if="contact.online" 
                        class="absolute bottom-0 right-1 h-3 w-3 rounded-full bg-success-500 border-2 border-white"
                      ></div>
                    </div>
                    <div>
                      <div class="flex items-center">
                        <span 
                          class="font-medium"
                          :class="[
                            contact.unread ? 'text-neutral-900' : 'text-neutral-700'
                          ]"
                        >{{ contact.name }}</span>
                        <span 
                          v-if="contact.unread"
                          class="ml-2 bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                        >{{ contact.unread }}</span>
                      </div>
                      <p 
                        class="text-sm truncate max-w-[180px]"
                        :class="[
                          contact.unread ? 'text-neutral-700 font-medium' : 'text-neutral-500'
                        ]"
                      >
                        {{ contact.lastMessage }}
                      </p>
                    </div>
                  </div>
                  <div class="text-xs text-neutral-500">{{ contact.time }}</div>
                </div>
              </div>
              
              <div v-if="filteredContacts.length === 0" class="p-8 text-center text-neutral-500">
                No conversations found
              </div>
            </div>
          </div>
          
          <!-- Chat Area -->
          <div class="hidden md:flex md:w-2/3 flex-col">
            <div v-if="!selectedContact" class="flex-grow flex items-center justify-center bg-neutral-50">
              <div class="text-center">
                <Icon name="heroicons:chat-bubble-left-right" class="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-neutral-700">Select a conversation</h3>
                <p class="text-neutral-500 mt-1">Choose a contact to start messaging</p>
              </div>
            </div>
            
            <div v-else class="flex-grow flex flex-col">
              <!-- Chat Header -->
              <div class="p-4 border-b border-neutral-200 flex justify-between items-center">
                <div class="flex items-center">
                  <div class="relative">
                    <div class="h-10 w-10 rounded-full overflow-hidden mr-3">
                      <img :src="selectedContact.avatar" :alt="selectedContact.name" class="h-full w-full object-cover" />
                    </div>
                    <div 
                      v-if="selectedContact.online" 
                      class="absolute bottom-0 right-1 h-2.5 w-2.5 rounded-full bg-success-500 border-2 border-white"
                    ></div>
                  </div>
                  <div>
                    <div class="font-medium">{{ selectedContact.name }}</div>
                    <div class="text-xs text-neutral-500">
                      {{ selectedContact.online ? 'Online' : 'Last seen ' + selectedContact.lastSeen }}
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
                  v-for="(message, index) in currentConversation"
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
                  </div>
                </div>
                
                <div v-if="isTyping" class="flex items-center text-sm text-neutral-500 mb-4">
                  <div class="h-8 w-8 rounded-full overflow-hidden mr-2">
                    <img :src="selectedContact.avatar" :alt="selectedContact.name" class="h-full w-full object-cover" />
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';

definePageMeta({
  layout: 'default'
});

// Search query
const searchQuery = ref('');

// Selected contact and new message
const selectedContact = ref(null);
const newMessage = ref('');
const messagesContainer = ref(null);
const isTyping = ref(false);

// Sample contacts and conversations
const contacts = ref([
  {
    id: 1,
    name: 'Alex Morgan',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'I\'ve reviewed your proposal and would like to schedule a call',
    time: '10:32 AM',
    unread: 2,
    online: true,
    lastSeen: '2 hours ago'
  },
  {
    id: 2,
    name: 'Emily Wilson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'Thanks for your help with the project!',
    time: 'Yesterday',
    unread: 0,
    online: false,
    lastSeen: '3 hours ago'
  },
  {
    id: 3,
    name: 'James Peterson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'When can you deliver the first milestone?',
    time: 'Yesterday',
    unread: 1,
    online: true,
    lastSeen: 'Just now'
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'The design looks great! I have some feedback though',
    time: 'Monday',
    unread: 0,
    online: false,
    lastSeen: 'Yesterday'
  },
  {
    id: 5,
    name: 'David Johnson',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: 'Let me know when you can start on the new project',
    time: 'Apr 28',
    unread: 0,
    online: false,
    lastSeen: '1 day ago'
  }
]);

// Sample conversations
const conversations = ref({
  1: [
    { sender: 'them', text: 'Hi Sarah, I saw your profile and I\'m impressed with your work.', time: 'Yesterday, 4:30 PM' },
    { sender: 'me', text: 'Thank you! I appreciate that. What kind of project do you have in mind?', time: 'Yesterday, 4:35 PM' },
    { sender: 'them', text: 'We need help building an e-commerce platform. I like your previous work in this area.', time: 'Yesterday, 4:40 PM' },
    { sender: 'me', text: 'That sounds interesting! I\'d be happy to discuss more details.', time: 'Yesterday, 4:45 PM' },
    { sender: 'them', text: 'Great! I\'ve reviewed your proposal and would like to schedule a call to discuss the project in more detail.', time: 'Today, 10:30 AM' },
    { sender: 'them', text: 'Would tomorrow at 2 PM EST work for you?', time: 'Today, 10:32 AM' }
  ],
  2: [
    { sender: 'me', text: 'Hi Emily, I\'ve just pushed the latest updates to the repository.', time: 'Monday, 11:20 AM' },
    { sender: 'them', text: 'Perfect! I\'ll take a look and get back to you.', time: 'Monday, 12:05 PM' },
    { sender: 'them', text: 'The changes look good. Can you also update the documentation?', time: 'Monday, 3:15 PM' },
    { sender: 'me', text: 'Sure, I\'ll take care of that by tomorrow.', time: 'Monday, 3:30 PM' },
    { sender: 'them', text: 'Thanks for your help with the project!', time: 'Yesterday, 2:45 PM' }
  ],
  3: [
    { sender: 'them', text: 'Hello Sarah, I\'m interested in your services for our mobile app.', time: 'Tuesday, 9:00 AM' },
    { sender: 'me', text: 'Hi James, thanks for reaching out! I\'d be happy to help with your mobile app. Can you share more details about the project?', time: 'Tuesday, 9:30 AM' },
    { sender: 'them', text: 'We need to add a few features to our existing app. I\'ve sent you the requirements document via email.', time: 'Tuesday, 10:15 AM' },
    { sender: 'me', text: 'Got it. I\'ll review the document and get back to you with my thoughts and a timeline.', time: 'Tuesday, 11:00 AM' },
    { sender: 'them', text: 'Great! Looking forward to your response. When can you deliver the first milestone?', time: 'Yesterday, 4:20 PM' }
  ],
  4: [
    { sender: 'me', text: 'Hi Maria, here\'s the initial design for your website. Let me know what you think!', time: 'Last Week' },
    { sender: 'them', text: 'Thanks for sending this over! I\'ll review it with my team.', time: 'Last Week' },
    { sender: 'them', text: 'The design looks great! I have some feedback though. Can we make the header a bit more prominent?', time: 'Monday, 1:15 PM' }
  ],
  5: [
    { sender: 'them', text: 'Hello Sarah, I hope you\'re doing well. We have a new project coming up and I wanted to check your availability.', time: 'Apr 25' },
    { sender: 'me', text: 'Hi David, I\'m doing great, thanks! I\'d be interested in hearing more about the project.', time: 'Apr 26' },
    { sender: 'them', text: 'It\'s a web application for a financial services company. Similar to the one we worked on last year but with more features.', time: 'Apr 26' },
    { sender: 'me', text: 'Sounds good! I should have availability starting next month.', time: 'Apr 27' },
    { sender: 'them', text: 'Perfect! Let me know when you can start on the new project', time: 'Apr 28' }
  ]
});

// Filtered contacts based on search query
const filteredContacts = computed(() => {
  if (!searchQuery.value) {
    return contacts.value;
  }
  
  return contacts.value.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Current conversation based on selected contact
const currentConversation = computed(() => {
  if (!selectedContact.value) return [];
  return conversations.value[selectedContact.value.id] || [];
});

// Select a contact
function selectContact(contact) {
  selectedContact.value = contact;
  
  // Mark as read
  if (contact.unread > 0) {
    contact.unread = 0;
  }
  
  // Scroll to bottom of messages
  nextTick(() => {
    scrollToBottom();
  });
}

// Send a message
function sendMessage() {
  if (!newMessage.value.trim() || !selectedContact.value) return;
  
  // Add message to conversation
  if (!conversations.value[selectedContact.value.id]) {
    conversations.value[selectedContact.value.id] = [];
  }
  
  conversations.value[selectedContact.value.id].push({
    sender: 'me',
    text: newMessage.value,
    time: 'Just now'
  });
  
  // Update last message in contacts
  const contactIndex = contacts.value.findIndex(c => c.id === selectedContact.value.id);
  if (contactIndex !== -1) {
    contacts.value[contactIndex].lastMessage = newMessage.value;
    contacts.value[contactIndex].time = 'Just now';
  }
  
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
  if (!selectedContact.value) return;
  
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
    
    conversations.value[selectedContact.value.id].push({
      sender: 'them',
      text: randomReply,
      time: 'Just now'
    });
    
    // Update last message in contacts
    const contactIndex = contacts.value.findIndex(c => c.id === selectedContact.value.id);
    if (contactIndex !== -1) {
      contacts.value[contactIndex].lastMessage = randomReply;
      contacts.value[contactIndex].time = 'Just now';
    }
    
    // Scroll to bottom
    nextTick(() => {
      scrollToBottom();
    });
  }, 2000);
}

// Watch for changes to selectedContact
watch(selectedContact, () => {
  if (selectedContact.value) {
    newMessage.value = '';
    nextTick(() => {
      scrollToBottom();
    });
  }
});
</script>