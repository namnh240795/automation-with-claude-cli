import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { Component, Palette, Zap, Shield } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Badge variant="secondary">New</Badge>
            <span className="text-sm font-medium">53 Components Available</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            shadcn/ui Components
            <span className="block text-primary mt-2">Complete Showcase</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Beautifully designed components built with Radix UI and Tailwind CSS.
            Fully accessible, customizable, and production-ready.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link to="/components">
                <Component className="mr-2 h-5 w-5" />
                View All Components
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-muted/50">
            <CardHeader>
              <Palette className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Fully Customizable</CardTitle>
              <CardDescription>
                Every component can be customized to match your brand. Built with CSS variables for easy theming.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-muted/50">
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Developer Experience</CardTitle>
              <CardDescription>
                Copy and paste into your project. No installation or configuration required.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-muted/50">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Accessible</CardTitle>
              <CardDescription>
                Built on top of Radix UI primitives. Fully accessible and WCAG compliant.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Component Categories */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Component Categories</h2>
            <p className="text-muted-foreground">Explore all available components organized by category</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.count} components</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/components">Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">53</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Accessible</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Runtime Dependencies</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">MIT</div>
              <div className="text-sm text-muted-foreground">License</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>Built with shadcn/ui, React Router, and Vite</p>
          <p className="mt-2">
            <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Learn more about shadcn/ui
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

const categories = [
  {
    title: 'Forms',
    icon: <Component className="h-5 w-5" />,
    count: 17,
    description: 'Input fields, buttons, selects, checkboxes, and more'
  },
  {
    title: 'Layout',
    icon: <Palette className="h-5 w-5" />,
    count: 8,
    description: 'Grid, separators, aspect ratio, and layout components'
  },
  {
    title: 'Overlays',
    icon: <Shield className="h-5 w-5" />,
    count: 10,
    description: 'Dialogs, sheets, popovers, tooltips, and modals'
  },
  {
    title: 'Data Display',
    icon: <Zap className="h-5 w-5" />,
    count: 8,
    description: 'Cards, tables, badges, avatars, and more'
  },
  {
    title: 'Feedback',
    icon: <Shield className="h-5 w-5" />,
    count: 6,
    description: 'Alerts, progress, skeletons, toasts, and spinners'
  },
  {
    title: 'Navigation',
    icon: <Component className="h-5 w-5" />,
    count: 4,
    description: 'Tabs, breadcrumbs, menus, and pagination'
  }
]
