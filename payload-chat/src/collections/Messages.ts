// collections/messages.js
import { CollectionConfig } from 'payload/types';

const Messages: CollectionConfig = {
  slug: 'messages',
  access:{
    create: () => true,
    read: () => true,
    update: () =>true,
    delete: () => true
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sender',
      type: 'relationship',
      relationTo: 'accounts',
      required: true,
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
    },
    {
      name: 'channel',
      type: 'relationship',
      relationTo: 'channels',
      required: true,
    },
  ],
};

export default Messages

