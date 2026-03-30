import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@/components/ui/menubar'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { toast } from 'sonner'
import { Info, AlertTriangle, CheckCircle, User, Settings, LogOut, Copy, Plus, Minus, X } from 'lucide-react'
import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'

export default function ComponentsShowcase() {
  const [sliderValue, setSliderValue] = useState([50])
  const [toggleValue, setToggleValue] = useState('left')
  const [toggleState, setToggleState] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-10 px-4 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">shadcn/ui Components Showcase</h1>
          <p className="text-muted-foreground text-lg">
            All components with their variants and states
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-12 pr-4">
            {/* Buttons */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Different button styles and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <Button size="default">Default</Button>
                    <Button size="sm">Small</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Input Fields */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Input Fields</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Form Inputs</CardTitle>
                  <CardDescription>Text inputs, textareas, and selects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Text Input</Label>
                    <Input id="text-input" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Disabled Input</Label>
                    <Input id="disabled-input" disabled placeholder="Disabled..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textarea">Textarea</Label>
                    <Textarea id="textarea" placeholder="Enter multiple lines..." rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="select">Select</Label>
                    <Select>
                      <SelectTrigger id="select">
                        <SelectValue placeholder="Select option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Option 1</SelectItem>
                        <SelectItem value="2">Option 2</SelectItem>
                        <SelectItem value="3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Checkbox, Radio, Switch */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Selection Controls</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Checkboxes, Radios, and Switches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Checkboxes</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">Accept terms and conditions</label>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Radio Group</Label>
                    <RadioGroup defaultValue="option1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="r1" />
                        <Label htmlFor="r1">Option 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="r2" />
                        <Label htmlFor="r2">Option 2</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Switches</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane" />
                      <Label htmlFor="airplane">Airplane Mode</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Sliders and Progress */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Sliders & Progress</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Sliders and Progress Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Slider: {sliderValue[0]}%</Label>
                    <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Progress Bars</Label>
                    <Progress value={33} />
                    <Progress value={66} />
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Badges & Avatars */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Badges & Avatars</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Status Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Badges</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Avatars</Label>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Alerts */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Alert Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>This is an informational alert message.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                  </Alert>
                  <Alert variant="default">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </section>

            {/* Tabs */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Tabbed Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tab1">
                    <TabsList>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                      <p className="p-4">Content for Tab 1</p>
                    </TabsContent>
                    <TabsContent value="tab2">
                      <p className="p-4">Content for Tab 2</p>
                    </TabsContent>
                    <TabsContent value="tab3">
                      <p className="p-4">Content for Tab 3</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Accordion */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Accordion</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Collapsible Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Cards */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content with some additional information.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Action</Button>
                  </CardFooter>
                </Card>
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle>Featured Card</CardTitle>
                    <CardDescription>Highlighted card variant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card has a primary border to highlight it.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle>Muted Card</CardTitle>
                    <CardDescription>Different background style</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card has a muted background.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Dialog */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Modal Dialog</CardTitle>
                  <CardDescription>Click the button to open a dialog</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => setDialogOpen(false)}>Confirm</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </section>

            {/* Sheet */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Sheet</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Slide-over Panel</CardTitle>
                  <CardDescription>Click the button to open a sheet</CardDescription>
                </CardHeader>
                <CardContent>
                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                      <Button>Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4 mt-4">
                        <Button className="w-full" onClick={() => setSheetOpen(false)}>Save changes</Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>
            </section>

            {/* Drawer */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Drawer</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Drawer</CardTitle>
                  <CardDescription>Bottom sheet for mobile</CardDescription>
                </CardHeader>
                <CardContent>
                  <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger asChild>
                      <Button>Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Are you sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                      </DrawerHeader>
                      <div className="flex gap-2 p-4">
                        <DrawerClose asChild>
                          <Button variant="outline" className="flex-1">Cancel</Button>
                        </DrawerClose>
                        <Button className="flex-1" onClick={() => setDrawerOpen(false)}>Confirm</Button>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </CardContent>
              </Card>
            </section>

            {/* Dropdown Menu */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Dropdown Menu</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Contextual Menus</CardTitle>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </section>

            {/* Popover */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Popover</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Floating Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">Popover Content</h4>
                        <p className="text-sm text-muted-foreground">
                          This is additional information.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </section>

            {/* Tooltip */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Tooltip</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Hover Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </section>

            {/* Hover Card */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Hover Card</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Rich Hover Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="outline">@hovercard</Button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">@hovercard</h4>
                        <p className="text-sm text-muted-foreground">
                          A component that displays rich content on hover
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardContent>
              </Card>
            </section>

            {/* Context Menu */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Context Menu</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Right-click Menu</CardTitle>
                  <CardDescription>Right-click on the text below</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContextMenu>
                    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                      Right click here
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy</span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </CardContent>
              </Card>
            </section>

            {/* Table */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Table</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Data Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">John Doe</TableCell>
                        <TableCell><Badge>Active</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Jane Smith</TableCell>
                        <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>

            {/* Toggle & Toggle Group */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Toggles</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Toggle Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Toggle pressed={toggleState} onPressedChange={setToggleState}>
                      {toggleState ? 'On' : 'Off'}
                    </Toggle>
                    <Toggle variant="outline">Outline</Toggle>
                  </div>
                  <Separator />
                  <ToggleGroup type="single" value={toggleValue} onValueChange={(v) => v && setToggleValue(v)}>
                    <ToggleGroupItem value="left" aria-label="Toggle left">
                      <Plus className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Toggle center">
                      <Minus className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Toggle right">
                      <X className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </CardContent>
              </Card>
            </section>

            {/* Breadcrumb */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Breadcrumb</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Navigation Breadcrumb</CardTitle>
                </CardHeader>
                <CardContent>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Showcase</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>
            </section>

            {/* Menubar */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Menubar</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Application Menu Bar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>
                          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Edit</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </CardContent>
              </Card>
            </section>

            {/* Navigation Menu */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Navigation Menu</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Navigation with Dropdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px]">
                            <li>
                              <NavigationMenuLink asChild>
                                <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    shadcn/ui
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Beautifully designed components
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </CardContent>
              </Card>
            </section>

            {/* Pagination */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Pagination</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Page Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>
            </section>

            {/* Resizable */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Resizable Panels</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Resizable Layout</CardTitle>
                  <CardDescription>Drag the handle to resize</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-[200px] items-center justify-center p-6 border rounded">
                        <span className="font-medium">Left Panel</span>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-[200px] items-center justify-center p-6 border rounded">
                        <span className="font-medium">Right Panel</span>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </CardContent>
              </Card>
            </section>

            {/* Aspect Ratio */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Aspect Ratio</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Fixed Aspect Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm font-medium">16:9</span>
                      </div>
                    </AspectRatio>
                    <AspectRatio ratio={4 / 3} className="bg-muted">
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm font-medium">4:3</span>
                      </div>
                    </AspectRatio>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Skeleton */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Skeleton</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Loading Placeholder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[100px] w-full rounded-xl" />
                </CardContent>
              </Card>
            </section>

            {/* Toast Demo */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Toast Notifications</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Sonner Toasts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => toast.success('Success!')}>
                      Success Toast
                    </Button>
                    <Button variant="outline" onClick={() => toast.error('Error!')}>
                      Error Toast
                    </Button>
                    <Button variant="secondary" onClick={() => toast.info('Info!')}>
                      Info Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Footer */}
            <footer className="text-center py-8 text-muted-foreground">
              <p>Powered by shadcn/ui • {new Date().getFullYear()}</p>
            </footer>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
