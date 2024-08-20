from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db

class Clan(db.Model, SerializerMixin):
    __tablename__ = "clans"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)

    events = db.relationship('ClanEvent', back_populates='clan')
    members = db.relationship('ClanMember', back_populates='clan')

    serialize_rules = ('-members.clan', '-events.clan')

    def __repr__(self):
        return f"<Clan {self.name}, {self.description}>"

class ClanMember(db.Model, SerializerMixin):
    __tablename__ = "clan_members"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, nullable=False)

    clan_id = db.Column(db.Integer, db.ForeignKey('clans.id'))

    clan = db.relationship('Clan', back_populates='members')
    participations = db.relationship('ClanEventParticipation', back_populates='member')

    serialize_rules = ('clan.members', '-participations.member')

    def __repr__(self):
        return f"<Clan Member: {self.username}, {self.role}>"

class ClanEvent(db.Model, SerializerMixin):
    __tablename__ = "clan_events"

    id = db.Column(db.Integer, primary_key=True)
    event = db.Column(db.String, nullable=False, unique=True)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String)
    details = db.Column(db.String)

    clan_id = db.Column(db.Integer, db.ForeignKey('clans.id'))

    clan = db.relationship('Clan', back_populates='events')
    participations = db.relationship('ClanEventParticipation', back_populates='event')

    serialize_rules = ('-clan.events', '-participations.event', '-participations.member.participations', '-participations.member.clan', '-clan.members')

    def __repr__(self):
        return f"<Clan Event: {self.event}, {self.date}, {self.location}, {self.details}>"

class ClanEventParticipation(db.Model, SerializerMixin):
    __tablename__ = "clan_event_participants"

    id = db.Column(db.Integer, primary_key=True)
    participation_status = db.Column(db.String, nullable=False)

    member_id = db.Column(db.Integer, db.ForeignKey('clan_members.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('clan_events.id'))

    member = db.relationship('ClanMember', back_populates='participations')
    event = db.relationship('ClanEvent', back_populates='participations')

    serialize_rules = ('-member.participations', '-event.participations')

    def __repr__(self):
        return f"<Clan Event Participation: {self.participation_status}>"
