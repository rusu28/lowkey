import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-12 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions or suggestions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Send size={18} />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2">Email Us</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      For general inquiries and support
                    </p>
                    <a
                      href="mailto:contact@laicontest.com"
                      className="text-primary hover:underline"
                    >
                      contact@laicontest.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Join our Discord server to connect with other participants
                    </p>
                    <a href="#" className="text-primary hover:underline">
                      Join Discord
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground">
                <h3 className="mb-2">Want to Organize a Competition?</h3>
                <p className="text-sm opacity-90 mb-4">
                  We welcome organizations and individuals who want to host competitions on our
                  platform.
                </p>
                <Button variant="secondary">Learn More</Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
