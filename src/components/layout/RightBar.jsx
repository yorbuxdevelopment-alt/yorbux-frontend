import SuggestionCard from '../widgets/SuggestionCard';
import RecentEventCard from '../widgets/RecentEventCard';
import BirthdayCard from '../widgets/BirthdayCard'; // Import the new component
import ProfileCard from '../widgets/ProfileCard';

const RightBar = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <ProfileCard />
      <SuggestionCard />
      {/* <RecentJobs /> Removed since it's now on the left sidebar */}
      <BirthdayCard />
    </div>
  );
};

export default RightBar;