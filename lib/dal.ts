import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'

export const getCurrentUser = async () => {
    const session = await getSession()
    if (!session) return null
  
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, session.userId))
  
      return result[0] || null
    } catch (error) {
      console.error('Error getting user by ID:', error)
      return null
    }
  }
