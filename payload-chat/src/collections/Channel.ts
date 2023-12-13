import { CollectionConfig } from 'payload/types'
import { authenticatedUser } from '../access/authenticatedUser'
import { authorOrAdmin } from '../access/authorOrAdmin'

const Channels: CollectionConfig = {
    slug: 'channels',
    admin: {
        useAsTitle: 'id',
    },
    access: {
        create: authenticatedUser,
        read: authenticatedUser,
        delete: authorOrAdmin,
        update: authenticatedUser
    },
    fields: [
        {
            name: 'authorID',
            type: 'text'
        },
        {
            name: 'chatHistory',
            type: 'array',
            fields: [
                {
                    name: 'sender',
                    type: 'text'
                },
                {
                    name: 'message',
                    type: 'textarea'
                },
            ]
        }
    ],
}

export default Channels