from config import app, db, api
from flask_restful import Resource
from models import Clan, ClanMember, ClanEventParticipation, ClanEvent
from flask import request
from datetime import datetime

class ClanResource(Resource):
  def get(self, clan_id):
    clan = Clan.query.get_or_404(clan_id)

    return clan.to_dict()
  
  def patch(self, clan_id):
    data = request.get_json()
    clan = Clan.query.get_or_404(clan_id)

    clan.name = data.get("name", clan.name)
    clan.description = data.get("descripition", clan.description)

    db.session.add(clan)
    db.session.commit()

    return clan.to_dict()
  
  def delete(self, clan_id):
    clan = Clan.query.get_or_404(clan_id)
    db.session.delete(clan)
    db.session.commit()

    return "", 204

# class ClanMemberResource(Resource):
#   def get(self, member_id):
#     clan_member = ClanMember.query.get_or_404(member_id)

#     return clan_member.to_dict()
  
#   def post(self):
#     data = request.get_json()
#     new_member = ClanMember(
#       username = data["username"],
#       role = data["role"]
#     )

#     db.session.add(new_member)
#     db.session.commit()
 
#     return new_member.to_dict(), 201
  
class ClanEventResource(Resource):
  def get(self, event_id):
    event = ClanEvent.query.get_or_404(event_id)

    return event.to_dict()
  
  def post(self):
    data = request.get_json()
    clan_id = data.get("clan_id")
    clan = Clan.query.get_or_404(clan_id)

    try:
        date = datetime.strptime(data["date"], "%Y-%m-%d")
    except ValueError:
      return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400
    
    latest_event = ClanEvent(
      event = data["event"],
      date = date,
      location = data["location"],
      details = data["details"],
      clan_id = clan_id
    )

    db.session.add(latest_event)
    db.session.commit()

    for member in clan.members:
      participation = ClanEventParticipation(
        participation_status = "Pending",
        member_id = member.id,
        event_id = latest_event.id
      )
      db.session.add(participation)
    db.session.commit()

    event_with_participations = latest_event.to_dict()
    event_with_participations["participations"] = [participation.to_dict() for participation in latest_event.participations]

    return event_with_participations, 201
  
class ClanEventParticipationResource(Resource):
  def get(self, participation_id):
    participation = ClanEventParticipation.query.get_or_404(participation_id)    
    return participation.to_dict()

  def post(self):
    data = request.get_json()
    member_id = data.get("member_id")
    event_id = data.get("event_id")
    member = ClanMember.query.get_or_404(member_id)
    event = ClanEvent.query.get_or_404(event_id)    
    
    updated_participation = ClanEventParticipation(
      participation_status = data["participation_status"],
      member = member,
      event = event
    )
    
    db.session.add(updated_participation)
    db.session.commit()    
    
    return updated_participation.to_dict(), 201
  
  def patch(self, participation_id):
    data = request.get_json()
    participation = ClanEventParticipation.query.get_or_404(participation_id)

    if "participation_status" in data:
      participation.participation_status = data["participation_status"]

    db.session.commit()

    return participation.to_dict()

class ClanListResource(Resource):
  def get(self):
    clans = Clan.query.all()
    return [clan.to_dict() for clan in clans]
  
  def post(self):
    data = request.get_json()
    latest_clan = Clan(
      name = data["name"],
      description = data["description"]
    )

    db.session.add(latest_clan)
    db.session.commit()

    return latest_clan.to_dict(), 201
  
class ClanEventListResource(Resource):
  def get(self):
    events = ClanEvent.query.all()
    return [event.to_dict() for event in events]
  
  def post(self):
    data = request.get_json()
    clan_id = data.get("clan_id")
    clan = Clan.query.get_or_404(clan_id)

    try:
        date = datetime.strptime(data["date"], "%Y-%m-%d")
    except ValueError:
      return {"error": "Invalid date format. Use YYYY-MM-DD."}, 400
    
    latest_event = ClanEvent(
      event = data["event"],
      date = date,
      location = data["location"],
      details = data["details"],
      clan_id = clan_id
    )

    db.session.add(latest_event)
    db.session.commit()

    for member in clan.members:
      participation = ClanEventParticipation(
        participation_status = "Pending",
        member_id = member.id,
        event_id = latest_event.id
      )
      db.session.add(participation)
    db.session.commit()

    event_with_participations = latest_event.to_dict()
    event_with_participations["participations"] = [participation.to_dict() for participation in latest_event.participations]

    return event_with_participations, 201
  
api.add_resource(ClanListResource, '/clans')
api.add_resource(ClanResource, '/clans/<int:clan_id>')
# api.add_resource(ClanMemberResource, '/members')
api.add_resource(ClanEventListResource, '/events')
api.add_resource(ClanEventResource, '/events/<int:event_id>')
api.add_resource(ClanEventParticipationResource, '/participations/<int:participation_id>')

if __name__ == "__main__":
  app.run(port=5555, debug=True)

