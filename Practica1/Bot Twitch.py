import os
from twitchio.ext import commands

# set up the bot
bot = commands.Bot(
    token= 'oauth:ook7kglnw1rzl2sg0fs0fy2homnfts',
    client_id= '5jen6yw81upmz3i1zutfvo90p2lpck',
    nick='yochirito',
    prefix='!',
    initial_channels=['yochirito']
)

@bot.event
async def event_ready():
    print('Ready')

@bot.command(name='hola')
async def hola(ctx):
    await ctx.send(f'buenas, {ctx.author.name} bienvenido a mi estream')

bot.run()