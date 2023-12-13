import { Access } from 'payload/config'

export const authenticatedUser: Access = ({ req: { user } }) => {
  if (!user) {
    return false
  }
  return true
}