'use client'
import { useState } from 'react';
import { Mail, CalendarHeart, Users, Music, AlertCircle } from 'lucide-react';

const WeddingRSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guestCount: 1,
    dietaryRestrictions: '',
    songRequest: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('请填写姓名和邮箱');
      return;
    }
    // 这里可以添加API调用来保存数据
    setSubmitted(true);
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <CalendarHeart className="w-16 h-16 mx-auto text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">感谢您的回复！</h2>
        <p className="text-gray-600">我们期待在婚礼上见到您。</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <CalendarHeart className="w-16 h-16 mx-auto text-pink-500" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">婚礼邀请回执</h1>
        <p className="text-gray-600 mt-2">2024年12月25日</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">您的姓名</label>
          <div className="relative">
            <Users className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="请输入您的姓名"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">邮箱地址</label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="请输入您的邮箱"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">是否参加？</label>
          <select
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="yes">是的，我会参加</option>
            <option value="no">抱歉，无法参加</option>
          </select>
        </div>

        {formData.attending === 'yes' && (
          <>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">随行人数</label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">饮食禁忌</label>
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="如有特殊饮食要求，请在此说明"
                rows={3}
              />
            </div>

          </>
        )}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition duration-200"
        >
          提交回执
        </button>
      </form>
    </div>
  );
};

export default WeddingRSVP;
