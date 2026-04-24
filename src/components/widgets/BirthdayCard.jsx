import React, { useEffect, useMemo, useState } from 'react';
import { Send, Cake } from 'lucide-react';
import { getBirthdayWidget, sendBirthdayWish } from '../../services/birthdays';

const defaultWishMessage = (name) => `Happy Birthday ${name}! Wishing you a great year ahead.`;

const BirthdayCard = () => {
  const [widget, setWidget] = useState({
    todayBirthday: null,
    upcomingBirthdays: [],
    upcomingCount: 0
  });
  const [wishMessage, setWishMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let active = true;

    const loadBirthdays = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getBirthdayWidget();
        if (!active) return;

        setWidget(data);
        setWishMessage(data.todayBirthday ? defaultWishMessage(data.todayBirthday.name) : '');
      } catch (requestError) {
        if (!active) return;
        setError(requestError.response?.data?.message || 'Birthday widget load nahi ho paaya');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBirthdays();

    return () => {
      active = false;
    };
  }, []);

  const todayBirthday = widget.todayBirthday;
  const upcomingText = useMemo(() => {
    if (widget.upcomingCount <= 0) return 'No upcoming birthdays right now';
    if (widget.upcomingCount === 1) return '1 connection has an upcoming birthday';
    return `${widget.upcomingCount} connections have upcoming birthdays`;
  }, [widget.upcomingCount]);

  const handleSendWish = async () => {
    if (!todayBirthday?.id || !wishMessage.trim()) return;

    setSending(true);
    setError('');
    setSuccessMessage('');

    try {
      await sendBirthdayWish({
        receiverId: todayBirthday.id,
        content: wishMessage.trim()
      });
      setSuccessMessage(`Wish sent to ${todayBirthday.name}`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Birthday wish send nahi ho paayi');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-bg-surface rounded-[24px] shadow-sm border border-border-ui overflow-hidden w-full">
      <div className="flex justify-between items-center px-6 py-4 border-b border-border-ui/50">
        <h3 className="font-bold text-text-main text-lg">Birthdays</h3>
        <button className="text-action-blue font-semibold text-sm hover:underline">
          See All
        </button>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {loading ? (
          <p className="text-sm text-text-sec">Birthdays loading...</p>
        ) : todayBirthday ? (
          <>
            <div className="flex items-center gap-4">
              <img
                src={todayBirthday.avatar || 'https://i.pravatar.cc/150?u=yorbux-birthday'}
                alt={todayBirthday.name}
                className="w-14 h-14 rounded-xl object-cover border border-border-ui/50"
              />
              <div className="flex flex-col min-w-0">
                <h4 className="font-bold text-text-main text-lg leading-tight truncate">
                  {todayBirthday.name}
                </h4>
                <p className="text-text-sec text-sm font-medium">
                  {todayBirthday.birthdayLabel || 'Birthday today'}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={wishMessage}
                  onChange={(event) => setWishMessage(event.target.value)}
                  placeholder={`Write to ${todayBirthday.name}`}
                  className="w-full bg-bg-page border-none rounded-xl py-3 px-4 text-text-main text-sm placeholder-text-sec focus:ring-1 focus:ring-action-blue/20 outline-none"
                />
              </div>
              <button
                onClick={handleSendWish}
                disabled={sending || !wishMessage.trim()}
                className="bg-action-blue/10 p-3 rounded-xl hover:bg-action-blue/20 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} className="text-action-blue transform rotate-[-20deg] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </>
        ) : (
          <div className="bg-bg-page rounded-[20px] p-4">
            <p className="font-semibold text-text-main text-sm">No birthdays today</p>
            <p className="text-text-sec text-xs mt-1">
              {widget.upcomingCount > 0 ? 'Upcoming birthdays are listed below.' : 'Add birthdays to profiles to see them here.'}
            </p>
          </div>
        )}

        <div className="bg-bg-page rounded-[20px] p-4 flex items-center gap-4">
          <div className="bg-[#FFF7ED] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <Cake size={22} className="text-[#F59E0B]" />
          </div>
          <div className="flex flex-col min-w-0">
            <h5 className="font-bold text-text-main text-base">
              Upcoming birthdays
            </h5>
            <p className="text-text-sec text-xs font-medium">
              {upcomingText}
            </p>
            {widget.upcomingBirthdays.length > 0 && (
              <p className="text-text-sec text-xs mt-1 truncate">
                {widget.upcomingBirthdays.map((user) => `${user.name} (${user.birthdayLabel})`).join(', ')}
              </p>
            )}
          </div>
        </div>

        {successMessage && <p className="text-xs text-green-600">{successMessage}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default BirthdayCard;
