import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PoliciesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private userSockets: Map<string, Set<string>> = new Map()

  handleConnection(client: Socket) {
    const username = client.handshake.query.username as string
    if (username) {
      if (!this.userSockets.has(username)) {
        this.userSockets.set(username, new Set())
      }
      this.userSockets.get(username)?.add(client.id)
      console.log(`Client connected: ${client.id} for user: ${username}`)
    }
  }

  handleDisconnect(client: Socket) {
    for (const [username, sockets] of this.userSockets.entries()) {
      if (sockets.has(client.id)) {
        sockets.delete(client.id)
        if (sockets.size === 0) {
          this.userSockets.delete(username)
        }
        break
      }
    }
    console.log(`Client disconnected: ${client.id}`)
  }

  notifyPolicyUpdate(username: string, update: { type: 'add' | 'remove', policy: string[] }) {
    const sockets = this.userSockets.get(username)
    if (sockets) {
      for (const socketId of sockets) {
        this.server.to(socketId).emit('policy-update', update)
      }
    }
  }

  @SubscribeMessage('subscribe-policies')
  handleSubscribe(client: Socket, username: string) {
    const room = `policies:${username}`
    client.join(room)
    console.log(`Client ${client.id} subscribed to policies for user: ${username}`)
    return { event: 'subscribed', data: { username } }
  }
}
