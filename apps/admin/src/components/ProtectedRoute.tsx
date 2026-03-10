import { Navigate } from 'react-router-dom'
import { usePermission } from '@/hooks/usePermission'

interface ProtectedRouteProps {
  resource: string
  action: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ resource, action, children, fallback }: ProtectedRouteProps) {
  const { permitted, loading } = usePermission(resource, action)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    )
  }

  if (!permitted) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">403</h1>
          <h2 className="text-2xl font-semibold">Forbidden</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            You don't have permission to access this resource.
          </p>
          <a
            href="/admin"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Higher-order component for protecting pages
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  resource: string,
  action: string
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute resource={resource} action={action}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}
