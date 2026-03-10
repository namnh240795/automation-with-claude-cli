import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Settings {
  emailNotifications: boolean
  pushNotifications: boolean
  twoFactorAuth: boolean
  profileVisibility: boolean
  marketingEmails: boolean
}

export default function SettingsPage() {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false,
    profileVisibility: true,
    marketingEmails: false,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!keycloak.authenticated) {
      navigate('/')
      return
    }

    // Load settings from localStorage (in a real app, this would be from an API)
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [keycloak, navigate])

  const handleSettingChange = (key: keyof Settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSaveSettings = () => {
    // Save settings to localStorage (in a real app, this would be saved to an API)
    localStorage.setItem('userSettings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleResetSettings = () => {
    const defaultSettings: Settings = {
      emailNotifications: true,
      pushNotifications: false,
      twoFactorAuth: false,
      profileVisibility: true,
      marketingEmails: false,
    }
    setSettings(defaultSettings)
    localStorage.removeItem('userSettings')
    setSaved(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My App</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/profile')}>
              Profile
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Settings</h2>
          <p className="text-muted-foreground mt-1">Manage your account preferences and security settings</p>
        </div>

        {saved && (
          <Alert className="mb-6">
            <AlertDescription>
              ✓ Settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Notification Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
              </div>
              <Switch
                id="marketing-emails"
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch
                id="2fa"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
              </div>
              <Switch
                id="profile-visibility"
                checked={settings.profileVisibility}
                onCheckedChange={(checked) => handleSettingChange('profileVisibility', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="mb-6 border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Download My Data
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleSaveSettings} className="flex-1">
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleResetSettings} className="flex-1">
            Reset to Defaults
          </Button>
        </div>

        {/* Sign Out */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
            >
              🚪 Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
