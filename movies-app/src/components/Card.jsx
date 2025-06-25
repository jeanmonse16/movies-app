import { Avatar, Card, Grid, Typography, Button } from "@mui/material"

export default ({ cardStyle, studios, movie, avatarSize, setMovieToTransfer }) => {
    const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'
    return <Grid size={{ xs: 12, sm: 6, lg:4 }}>
        <Card className={cardStyle}>
            <Avatar 
              alt={movie.name} 
              src={movie.img ? movie.img : defaultAvatar}
              style={{margin: 5, width: avatarSize, height: avatarSize}}
              slotProps={{ img: { referrerPolicy: 'no-referrer' }  }}
            />
            
            <div style={{ display: 'flex', gap: '4px' }}>
                <Typography style={{display: 'inline-block'}}>
                {movie.name + ' '}
                </Typography>
                <Typography style={{ fontWeight: 'bold', display: 'inline-block'}}>
                {movie.genreName}
                </Typography>
            </div>
            <Typography>
                {
                    // eslint-disable-next-line
                    studios.map(studio => {
                      if (movie.studioId === studio.id) {
                        return studio.name
                      }}
                    )
                }
            </Typography>
            
            <Button onClick={() => setMovieToTransfer(movie)} title="transfer"> Transfer </Button>
        </Card>
    </Grid>
}