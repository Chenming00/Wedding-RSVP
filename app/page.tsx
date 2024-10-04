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

const InvitationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('');
  const [guests, setGuests] = useState('0');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, phone, attendance, guests, dietaryRestrictions, message });
    // Here you would send the data to your backend
    alert('邀请回复已提交！谢谢您的回复。');
  };

  return (
    <Card className="w-full max-w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">婚礼邀请函</CardTitle>
        <CardDescription className="text-center">我们诚挚地邀请您参加我们的婚礼</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">电话</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>是否参加？</Label>
            <RadioGroup value={attendance} onValueChange={setAttendance} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">是</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">否</Label>
              </div>
            </RadioGroup>
          </div>
          {attendance === 'yes' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="guests">随行宾客数量</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择随行宾客数量" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dietary" className="flex items-center space-x-2">
                  <span>饮食限制</span>
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
                </Label>
                <Textarea 
                  id="dietary" 
                  placeholder="如有特殊饮食需求，请在此说明" 
                  value={dietaryRestrictions} 
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="message">留言</Label>
            <Textarea 
              id="message" 
              placeholder="给新人的祝福或其他留言" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">提交回复</Button>
      </CardFooter>
    </Card>
  );
};

export default InvitationForm;