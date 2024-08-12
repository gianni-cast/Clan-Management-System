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

class ClanMember(db.Model, SerializerMixin):
    __tablename__ = "clan_members"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, nullable=False)
    clan_id = db.Column(db.Integer, db.ForeignKey('clans.id'))

    clan = db.relationship('Clan', back_populates='members')


class ClanEvent(db.Model, SerializerMixin):
    __tablename__ = "clan_events"

    id = db.Column(db.Integer, primary_key=True)
    event = db.Column(db.String, nullable=False, unique=True)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String)
    details = db.Column(db.String)
    clan_id = db.Column(db.Integer, db.ForeignKey('clans.id'))

    participants = db.relationship('ClanMember', secondary='clan_event_participations', back_populates='events')

class ClanEventParticipation(db.Model):
    __tablename__ = "clan_event_participants"

    id = db.Column(db.Integer, primary_key=True)
    participation_status = db.Column(db.String, nullable=False)

    member_id = db.Column(db.Integer)
