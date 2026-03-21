import SuggestionCard from '../widgets/SuggestionCard';
import RecentEventCard from '../widgets/RecentEventCard';
import BirthdayCard from '../widgets/BirthdayCard'; // Import the new component

const RightBar = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <SuggestionCard />
      <RecentEventCard />
      <BirthdayCard />
    </div>
  );
};

export default RightBar;