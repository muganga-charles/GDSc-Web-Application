import PersistentDrawerLeft from './Drawer';
export default function MemberPage() {
  const memberData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div>
      <PersistentDrawerLeft />
      
    </div>
    
  );
}
