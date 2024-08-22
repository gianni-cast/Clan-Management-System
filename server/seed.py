from config import app, db
from models import Clan, ClanEvent, ClanEventParticipation, ClanMember
from datetime import datetime
from faker import Faker
import random

fake = Faker()

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

        db.session.add_all(clans)
        db.session.commit()

        print("Creating Clan Members...")
        members = []
        for _ in range(100):
            username = fake.user_name()
            role = random.choice(["Leader", "Member"])
            clan = random.choice(clans)
            member = ClanMember(username=username, role=role, clan_id=clan.id)
            members.append(member)

        db.session.add_all(members)
        db.session.commit()

        print("Creating Clan Events...")
        event_1 = ClanEvent(
            event="Wildy Battle Royale",
            date=datetime(2024, 8, 15, 20, 0, 0),
            location="Wilderness",
            details="100 man PvP competition! Last Man Standing wins the 1b prize!",
            clan_id=clan_1.id
        )
        event_2 = ClanEvent(
            event="Quest Cape Meetup",
            date=datetime(2024, 10, 24, 15, 0, 0),
            location="Falador",
            details="Bring Your Quest Cape and good vibes!",
            clan_id=clan_2.id
        )
        event_3 = ClanEvent(
            event="Woodcutting hangout at Redwoods",
            date=datetime(2024, 9, 16, 12, 0, 0),
            location="Woodcutting Guild",
            details="Hangout session at the woodcutting guild",
            clan_id=clan_3.id
        )
        events = [event_1, event_2, event_3]

        db.session.add_all(events)
        db.session.commit()

        print("Creating Clan Event Participation...")
        participation = []
        for member in members:
            member_events = [event for event in events if event.clan_id == member.clan_id]
            for event in member_events:
                participation.append(ClanEventParticipation(
                    member_id=member.id,
                    event_id=event.id,
                    participation_status="Pending"
                ))

        db.session.add_all(participation)
        db.session.commit()

        print("Seeding done!")