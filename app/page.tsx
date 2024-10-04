'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const InvitationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '0',
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, guests: parseInt(formData.guests) }),
      });

      if (response.ok) {
        toast({
          title: "提交成功",
          description: "邀请回复已成功提交！谢谢您的回复。",
        });
        setFormData({
          name: '', email: '', phone: '', attendance: '',
          guests: '0', dietaryRestrictions: '', message: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || '提交失败');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast({
        title: "提交失败",
        description: error.message || "提交过程中发生错误，请稍后再试。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">婚礼邀请函</CardTitle>
        <CardDescription className="text-center">我们诚挚地邀请您参加我们的婚礼</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="姓名" name="name" value={formData.name} onChange={handleChange} required />
          <FormField label="邮箱" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <FormField label="电话" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          
          <div className="space-y-2">
            <Label>是否参加？</Label>
            <RadioGroup value={formData.attendance} onValueChange={(value) => handleChange({ target: { name: 'attendance', value } })} className="flex space-x-4">
              <RadioOption value="yes" label="是" />
              <RadioOption value="no" label="否" />
            </RadioGroup>
          </div>
          
          {formData.attendance === 'yes' && (
            <>
              <FormField 
                label="随行宾客数量" 
                name="guests" 
                value={formData.guests} 
                onChange={handleChange}
                component={
                  <Select value={formData.guests} onValueChange={(value) => handleChange({ target: { name: 'guests', value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择随行宾客数量" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(11).keys()].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
              />
              <FormField 
                label={
                  <span className="flex items-center space-x-2">
                    饮食限制
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>请告诉我们您的任何饮食限制或过敏情况，以便我们做好准备。</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                }
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                component={<Textarea placeholder="如有特殊饮食需求，请在此说明" />}
              />
            </>
          )}
          
          <FormField 
            label="留言" 
            name="message" 
            value={formData.message} 
            onChange={handleChange}
            component={<Textarea placeholder="给新人的祝福或其他留言" />}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '提交中...' : '提交回复'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const FormField = ({ label, name, value, onChange, required, type = "text", component }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    {component || <Input id={name} name={name} type={type} value={value} onChange={onChange} required={required} />}
  </div>
);

const RadioOption = ({ value, label }) => (
  <div className="flex items-center space-x-2">
    <RadioGroupItem value={value} id={value} />
    <Label htmlFor={value}>{label}</Label>
  </div>
);

export default InvitationForm;