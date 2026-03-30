import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Component, Home } from 'lucide-react'

export function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Component className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">shadcn/ui</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant={isActive('/') ? 'default' : 'ghost'}
            size="sm"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          <Button
            asChild
            variant={isActive('/components') ? 'default' : 'ghost'}
            size="sm"
          >
            <Link to="/components" className="flex items-center gap-2">
              <Component className="h-4 w-4" />
              <span className="hidden sm:inline">Components</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
