import { FC } from 'react'
import styled from 'styled-components'

import { Blog } from '../Blog'
import { PostList } from '../Components'

const Container = styled.section`
  display: flex;
`

const Image = styled.img`
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
`

const TextContainer = styled.div`
  padding: 1rem;
  margin: 1rem 0;
`

const AboutContainer = styled.article`
  p {
    margin-bottom: 1rem;
  }
`

export const About: FC = () => {
  return (
    <Container>
      <Image src="/image/home.png" alt={process.env.REACT_APP_DEVELOPER_NAME} />
      <TextContainer>
        <AboutContainer>
          <h2>About Me</h2>
          <p>
            Hi, my name is Jason. I am a web developer who loves solving
            challenging puzzles. The reason I got into programming is
            interesting. Growing up, my dad bought a Packard Bell 486 computer,
            and I was hooked immediately. I used to break Windows 3.1 to see how
            it worked. I could reinstall the OS in 5 minutes, so my family never
            found out what I was up to.
          </p>
          <p>
            I'm in search of my next professional opportunity. I am excited to
            tie together my drive to apply new and emerging technology tools at
            a company needing a creative, hard-working, and collaborative
            engineer. I feel I would be an excellent fit for your organization
            while supporting your needs in full-stack development, quality
            assurance, and tool enhancement.
          </p>
          <p>
            Offering nearly 15 years of experience in web development, software
            engineering, and frontend engineering, I have progressed to senior
            project roles and been part of many exciting initiatives. As a
            Senior Frontend Engineer with Rivian, I spearheaded several
            improvement projects to help staff and customers. My efforts
            included boosting testing, supporting developers, and elevating the
            customer interface of an online catalogue.
          </p>
          <p>
            Before moving to Vancouver, I launched my technical career in
            Ontario, where my professional highlights spanned website
            improvements, data management, new email system features, and other
            projects. All my work focused on helping my employers reach and
            retain customers.
          </p>
        </AboutContainer>

        <h2>Latest Posts</h2>
        <Blog>
          <PostList numberOfPosts={3} />
        </Blog>
      </TextContainer>
    </Container>
  )
}
