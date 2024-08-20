from config import app, db
from models import Clan, ClanEvent, ClanEventParticipation, ClanMember
from datetime import datetime

if __name__ == "__main__":
  with app.app_context():
    print("Starting seed...")

    print("Creating tables...")
    db.create_all()

    print("Deleting data...")
    Clan.query.delete()
    ClanMember.query.delete()
    ClanEvent.query.delete()
    ClanEventParticipation.query.delete()

    print("Creating Clan...")
    clan_1 = Clan(name="RoT", description="Focus on PKing in the wilderness!") 
    clan_2 = Clan(name="Elysium", description="Focus on helping clan members to complete quest!")
    clan_3 = Clan(name="Hexis", description="Skilling friends are welcome here!")
    clans = [clan_1, clan_2, clan_3]

    print("Creating Clan Members...")
    member_1 = ClanMember(username="player1", role="Leader", clan=clan_1) 
    member_2 = ClanMember(username="player2", role="Member", clan=clan_1)
    member_3 = ClanMember(username="player3", role="Member", clan=clan_2)
    member_4 = ClanMember(username="player4", role="Leader", clan=clan_3)
    members = [member_1, member_2, member_3, member_4]

    print("Creating Clan Events...")
    event_1 = ClanEvent(
      event="Wildy Battle Royale",
      date = datetime(2024, 8, 15, 20, 0, 0),
      location = "Wilderness",
      details = "100 man PvP competition! Last Man Standing wins the 1b prize!",
      clan = clan_1
    )
    event_2 = ClanEvent(
      event="Quest Cape Meetup",
      date = datetime(2024, 10, 24, 15, 0, 0),
      location = "Falador",
      details = "Bring Your Quest Cape and good vibes!",
      clan = clan_2
    )
    event_3 = ClanEvent(
      event="Woodcutting hangout at Redwoods",
      date = datetime(2024, 9, 16, 12, 0, 0),
      location = "Woodcutting Guild",
      details = "Hangout session at the woodcutting guild",
      clan = clan_3
    )
    events = [event_1, event_2, event_3]

    print("Creating Clan Event Particpation...")
    participation_1 = ClanEventParticipation(
      member = member_1,
      event = event_1,
      participation_status = "Confirmed"
    )
    participation_2 = ClanEventParticipation(
      member = member_2,
      event = event_1,
      participation_status = "Pending"
    )
    participation_3 = ClanEventParticipation(
      member = member_3,
      event = event_2,
      participation_status = "Confirmed"
    )
    participation_4 = ClanEventParticipation(
      member = member_4,
      event = event_3,
      participation_status = "Pending"
    )
    participation = [participation_1, participation_2, participation_3, participation_4]

    db.session.add_all(clans)
    db.session.add_all(members)
    db.session.add_all(events)
    db.session.add_all(participation)
    db.session.commit()


    print("Seeding done!")